import { Metadata } from "next";

import ProfilePhone from "@modules/account/components/profile-phone";
import ProfileBillingAddress from "@modules/account/components/profile-billing-address";
import ProfileEmail from "@modules/account/components/profile-email";
import ProfileName from "@modules/account/components/profile-name";
import ProfilePassword from "@modules/account/components/profile-password";

import { notFound } from "next/navigation";
import { listRegions } from "@lib/data/regions";
import { retrieveCustomer } from "@lib/data/customer";
import Divider from "@/modules/common/components/divider";

export const metadata: Metadata = {
  title: "Profilim",
  description: "Profil bilgilerinizi görüntüleyin ve güncelleyin.",
};

export default async function Profile() {
  const customer = await retrieveCustomer();
  const regions = await listRegions();

  if (!customer || !regions) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl">Profilim</h1>
        <p className="text-base">
          Adınız, e-postanız ve telefon numaranız dahil olmak üzere profil
          bilgilerinizi görüntüleyin ve güncelleyin. Ayrıca fatura adresinizi
          güncelleyebilir veya parolanızı değiştirebilirsiniz.
        </p>
      </div>
      <div className="flex w-full flex-col gap-y-8">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        <ProfilePassword customer={customer} />
        <Divider />
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  );
}
