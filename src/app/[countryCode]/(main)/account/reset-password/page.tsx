import ResetPasswordTemplate from "@modules/account/components/reset-password";
import AccountLayout from "@modules/account/templates/account-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yeni Şifre Belirle",
  description: "Hesabınız için yeni bir şifre belirleyin.",
};

export default function ResetPasswordPage() {
  return (
    <AccountLayout customer={null}>
      <ResetPasswordTemplate />
    </AccountLayout>
  );
} 