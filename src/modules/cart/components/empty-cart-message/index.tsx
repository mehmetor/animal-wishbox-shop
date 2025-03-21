import { Heading, Text } from "@medusajs/ui";

import InteractiveLink from "@modules/common/components/interactive-link";

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-start justify-center px-2 py-48"
      data-testid="empty-cart-message"
    >
      <h2 className="flex flex-row items-baseline gap-x-2 text-2xl">
        Sepetiniz
      </h2>
      <p className="mt-4 mb-6 max-w-[32rem] text-base">
        Sepetinizde ürün bulunmamaktadır. Ürünleri keşfetmek için aşağıdaki
        bağlantıyı kullanın.
      </p>
      <div>
        <InteractiveLink href="/store">Ürünleri keşfet</InteractiveLink>
      </div>
    </div>
  );
};

export default EmptyCartMessage;
