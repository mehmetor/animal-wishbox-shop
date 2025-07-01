import ResetPasswordTemplate from "@modules/account/components/reset-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Şifremi Unuttum",
  description: "Şifrenizi sıfırlayın.",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex w-full justify-center px-8 py-8">
      <ResetPasswordTemplate />
    </div>
  );
} 