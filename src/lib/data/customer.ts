"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeAuthToken,
  setAuthToken,
} from "./cookies"
import { cookies } from "next/headers"

export const retrieveCustomer =
  async (): Promise<HttpTypes.StoreCustomer | null> => {
    const authHeaders = await getAuthHeaders()

    if (!authHeaders) return null

    const headers = {
      ...authHeaders,
    }

    const next = {
      ...(await getCacheOptions("customers")),
    }

    return await sdk.client
      .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
        method: "GET",
        query: {
          fields: "*orders",
        },
        headers,
        next,
        cache: "force-cache",
      })
      .then(({ customer }) => customer)
      .catch((error) => {
        console.error("Error retrieving customer:", error);
        return null;
      })
  }

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError)

  const cacheTag = await getCacheTag("customers")
  revalidateTag(cacheTag)

  return updateRes
}

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
  }

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })

    await setAuthToken(token as string)

    const headers = {
      ...(await getAuthHeaders()),
    }

    const { customer: createdCustomer } = await sdk.store.customer.create(
      customerForm,
      {},
      headers
    )

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    })

    await setAuthToken(loginToken as string)

    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)

    await transferCart()

    return createdCustomer
  } catch (error: any) {
    return error.toString()
  }
}

export async function login(
  _currentState: unknown,
  formData: FormData
): Promise<string | null> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const token = await sdk.auth.login("customer", "emailpass", {
      email,
      password,
    })
    await setAuthToken(token as string)

    // Giriş sonrası müşteri verisini doğrula
    const customer = await retrieveCustomer()
    if (!customer) {
      // Eğer müşteri verisi alınamazsa, bu bir "not found" durumudur.
      // Token'ı temizle ve hata döndür.
      removeAuthToken()
      return "E-posta veya şifre hatalı. Lütfen bilgilerinizi kontrol edip tekrar deneyin."
    }

    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)

    await transferCart()
  } catch (error: any) {
    // Token'ı temizle
    removeAuthToken()

    if (
      error.message &&
      (error.message.toLowerCase().includes("not found") ||
        error.message.toLowerCase().includes("invalid email or password"))
    ) {
      return "E-posta veya şifre hatalı. Lütfen bilgilerinizi kontrol edip tekrar deneyin."
    }
    console.error("Login error:", error)
    return "Giriş sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin."
  }
  return null
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()
  removeAuthToken()
  
  const customerCacheTag = await getCacheTag("customers")
  revalidateTag(customerCacheTag)
  
  redirect(`/${countryCode}/account`)
}

export async function transferCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return
  }

  const headers = await getAuthHeaders()

  await sdk.store.cart.transferCart(cartId, {}, headers)

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
}

export const addCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false
  const isDefaultShipping = (currentState.isDefaultShipping as boolean) || false

  const address: any = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
  }

  const phoneValue = formData.get("phone");
  if (phoneValue) {
    address.phone = phoneValue as string;
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async ({ customer }) => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId =
    (currentState.addressId as string) || (formData.get("addressId") as string)

  if (!addressId) {
    return { success: false, error: "Address ID is required" }
  }

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
  } as HttpTypes.StoreUpdateCustomerAddress

  const phoneValue = formData.get("phone");
  if (phoneValue) {
    address.phone = phoneValue as string;
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export async function requestPasswordReset(
  previousState: any,
  formData: FormData
): Promise<{ success?: boolean; message?: string }> {
  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, message: "Lütfen e-posta adresinizi girin." };
  }

  try {
    await sdk.auth.resetPassword("customer", "emailpass", { identifier: email });
  } catch (error: any) {
    return { success: false, message: error.toString() };
  }

  return {
    success: true,
    message:
      "Girmiş olduğunuz e-posta adresine sahip bir hesap varsa, şifre sıfırlama talimatlarını içeren bir e-posta gönderilecektir.",
  };
}

export async function resetPassword(
  previousState: any,
  formData: FormData
): Promise<{ success?: boolean; message?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("password_confirm") as string;
  const token = formData.get("token") as string;

  if (!email || !password || !token) {
    return { success: false, message: "Lütfen tüm alanları doldurun." };
  }

  if (password !== passwordConfirm) {
    return { success: false, message: "Şifreleriniz eşleşmiyor." };
  }

  try {
    await sdk.auth.updateProvider(
      "customer",
      "emailpass",
      { email, password },
      token
    );
  } catch (error: any) {
    return { success: false, message: error.toString() };
  }

  // Şifre değiştikten sonra, güvenlik için mevcut oturumu sonlandır.
  await sdk.auth.logout();
  removeAuthToken();

  revalidateTag("customer");
  return {
    success: true,
    message: "Şifreniz başarıyla güncellendi. Lütfen tekrar giriş yapın.",
  };
}
