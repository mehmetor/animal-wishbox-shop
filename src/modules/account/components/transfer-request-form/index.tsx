"use client";

import { useActionState } from "react";
import { createTransferRequest } from "@lib/data/orders";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false);

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  });

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true);
    }
  }, [state.success, state.order]);

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="grid w-full items-center gap-x-8 gap-y-4 sm:grid-cols-2">
        <div className="flex flex-col gap-y-1">
          <h3 className="text-lg text-neutral-950">Sipariş transferleri</h3>
          <p className="text-muted-foreground text-base">
            Aradığınız siparişi bulamıyor musunuz?
            <br /> Hesabınıza bir sipariş bağlayın.
          </p>
        </div>
        <form
          action={formAction}
          className="flex flex-col gap-y-1 sm:items-end"
        >
          <div className="flex w-full flex-col gap-y-2">
            <Input className="w-full" name="order_id" placeholder="Order ID" />
            <SubmitButton className="self-end whitespace-nowrap">
              Transfer iste
            </SubmitButton>
          </div>
        </form>
      </div>
      {!state.success && state.error && (
        <p className="text-destructive text-right text-base">{state.error}</p>
      )}
      {showSuccess && (
        <div className="flex w-full items-center justify-between self-stretch bg-neutral-50 p-4">
          <div className="flex items-center gap-x-2">
            <CheckCircle className="text-success" />
            <div className="flex flex-col gap-y-1">
              <p className="text-base text-neutral-950">
                #{state.order?.id} siparişi için transfer talep edildi
              </p>
              <p className="text-base text-neutral-600">
                Transfer talebi e-postası <strong>{state.order?.email}</strong>{" "}
                adresine gönderildi
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="h-fit"
            onClick={() => setShowSuccess(false)}
          >
            <XCircle />
          </Button>
        </div>
      )}
    </div>
  );
}
