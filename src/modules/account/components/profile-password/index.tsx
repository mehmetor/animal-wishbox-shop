"use client";

import React, { useEffect, useActionState } from "react";
import Input from "@modules/common/components/input";
import AccountInfo from "../account-info";
import { HttpTypes } from "@medusajs/types";

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer;
};

const ProfilePassword: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false);

  const updatePassword = async (
    _currentState: Record<string, unknown>,
    formData: FormData,
  ) => {
    throw new Error("Not implemented");
  };

  const [state, formAction] = useActionState(updatePassword, {
    error: null,
    success: false,
  });

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success);
  }, [state]);

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label="Şifre"
        currentInfo={
          <span className="text-muted-foreground">
            Güvenlik nedeniyle şifre görünmez
          </span>
        }
        isSuccess={successState}
        isError={!!state?.error}
        errorMessage={state?.error || undefined}
        clearState={clearState}
        data-testid="account-password-editor"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Eski Şifre"
            name="old_password"
            required
            type="password"
            data-testid="old-password-input"
          />
          <Input
            label="Yeni Şifre"
            type="password"
            name="new_password"
            required
            data-testid="new-password-input"
          />
          <Input
            label="Şifreyi Doğrula"
            type="password"
            name="confirm_password"
            required
            data-testid="confirm-password-input"
          />
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfilePassword;
