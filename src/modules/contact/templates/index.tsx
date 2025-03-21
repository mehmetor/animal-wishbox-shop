import { Suspense } from "react";
import ContactForm from "../components/contact-form";
import ContactInformation from "../components/contact-information";
import GlobeComponent from "../components/globe";

interface ContactTemplateProps {
  countryCode: string;
}

const ContactTemplate = ({ countryCode }: ContactTemplateProps) => {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 md:py-12">
      <div className="mb-8 md:mb-10">
        <h1
          className="text-2xl text-gray-900 md:text-3xl lg:text-4xl"
          data-testid="contact-page-title"
        >
          İletişim
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] lg:gap-10">
        {/* Sol taraf - İletişim formu */}
        <main className="order-2 lg:order-1">
          <div className="rounded-xl border border-gray-100 bg-white/50 p-5 shadow-sm backdrop-blur-sm">
            <h2 className="mb-6 text-xl font-medium">Bize Ulaşın</h2>
            <Suspense
              fallback={
                <div className="h-96 animate-pulse rounded bg-gray-100"></div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </main>

        {/* Sağ taraf - İletişim bilgileri */}
        <aside className="order-1 lg:order-2">
          <div className="sticky top-20 pb-10">
            <div className="rounded-xl border border-gray-100 bg-white/50 p-5 shadow-sm backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-medium">
                İletişim Bilgilerimiz
              </h2>
              <Suspense
                fallback={
                  <div className="h-64 animate-pulse rounded bg-gray-100"></div>
                }
              >
                <ContactInformation />
              </Suspense>
            </div>
          </div>
        </aside>
      </div>

      {/* Globe for: UAE - Turkey - KSA - Egypt - UK - Canada */}
      <div className="mt-8 flex justify-center">
        <Suspense
          fallback={
            <div className="h-64 animate-pulse rounded bg-gray-100"></div>
          }
        >
          <GlobeComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default ContactTemplate;
