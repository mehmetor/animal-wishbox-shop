import React, { Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ModalProvider, useModal } from "@lib/context/modal-context";
import { cn } from "@/lib/utils";

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  size?: "small" | "medium" | "large";
  search?: boolean;
  children: React.ReactNode;
  "data-testid"?: string;
};

const Modal = ({
  isOpen,
  close,
  size = "medium",
  search = false,
  children,
  "data-testid": dataTestId,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        data-testid={dataTestId}
        className={cn("px-0", {
          "max-w-md": size === "small",
          "max-w-xl": size === "medium",
          "max-w-3xl": size === "large",
          "bg-transparent shadow-none": search,
          "bg-white": !search,
        })}
      >
        <ModalProvider close={close}>{children}</ModalProvider>
      </DialogContent>
    </Dialog>
  );
};

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DialogTitle className="mb-4 border-b px-8 pb-4 text-xl font-normal">
      {children}
    </DialogTitle>
  );
};

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DialogDescription className="text-foreground flex h-full items-center justify-center pt-2 pb-4 text-sm font-normal">
      {children}
    </DialogDescription>
  );
};

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex justify-center px-8">{children}</div>;
};

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DialogFooter className="mt-4 flex flex-row items-center justify-between gap-x-4 border-t px-8 pt-4">
      {children}
    </DialogFooter>
  );
};

Modal.Title = Title;
Modal.Description = Description;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
