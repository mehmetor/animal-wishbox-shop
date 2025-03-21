import { Loader } from "lucide-react";
import React from "react";

import { IconProps } from "types/icon";

const Spinner: React.FC<IconProps> = ({
  size = "24",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <Loader
      className="animate-spin"
      size={size}
      color={color}
      {...attributes}
    />
  );
};

export default Spinner;
