import { Metadata } from "next";
import ContactTemplate from "@modules/contact/templates";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Animal Wishbox ile iletişime geçin.",
};

type Params = {
  params: Promise<{
    countryCode: string;
  }>;
};

export default async function ContactPage(props: Params) {
  const params = await props.params;

  return <ContactTemplate countryCode={params.countryCode} />;
}
