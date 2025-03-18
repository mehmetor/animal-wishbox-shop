import { Text } from "@medusajs/ui";

import Medusa from "../../../common/icons/medusa";
import NextJs from "../../../common/icons/nextjs";

const MedusaCTA = () => {
  return (
    <Text className="txt-compact-small-plus flex items-center gap-x-2">
      Powered by
      <a
        href="https://wishfulgeneraltrading.com/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="h-6"
          alt="Animal Wishbox"
          src="https://mscrosugxoblkqhymkux.supabase.co/storage/v1/object/public/media//animal-wishbox-logo-small-72x72.png"
        />
      </a>
    </Text>
  );
};

export default MedusaCTA;
