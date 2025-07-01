"use client";

import React from "react";
import { User } from "lucide-react";
import { HttpTypes } from "@medusajs/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LocalizedClientLink from "../localized-client-link";

type UserAvatarProps = {
  customer: HttpTypes.StoreCustomer | null;
  className?: string;
};

const UserAvatar: React.FC<UserAvatarProps> = ({
  customer,
  className = "",
}) => {
  if (!customer) {
    return (
      <LocalizedClientLink href="/account" data-testid="nav-account-link">
        <User className={`hover:text-gray-700 ${className}`} />
      </LocalizedClientLink>
    );
  }

  const initials =
    customer.first_name && customer.last_name
      ? `${customer.first_name[0]}${customer.last_name[0]}`
      : customer.email?.substring(0, 2).toUpperCase();

  return (
    <LocalizedClientLink href="/account" data-testid="nav-account-link">
      <Avatar className={` ${className}`}>
        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>
    </LocalizedClientLink>
  );
};

export default UserAvatar;
