import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect } from "react";

import useToggleState from "@lib/hooks/use-toggle-state";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type AccountInfoProps = {
  label: string;
  currentInfo: string | React.ReactNode;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
  clearState: () => void;
  children?: React.ReactNode;
  "data-testid"?: string;
};

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "Bir hata oluştu, lütfen daha sonra tekrar deneyiniz.",
  children,
  "data-testid": dataTestid,
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState();

  const { pending } = useFormStatus();

  const handleToggle = () => {
    clearState();
    setTimeout(() => toggle(), 100);
  };

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess, close]);

  return (
    <div className="text-sm font-normal" data-testid={dataTestid}>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-foreground text-xl pb-1">{label}</span>
          <div className="flex flex-1 basis-0 items-center gap-x-4">
            {typeof currentInfo === "string" ? (
              <span className="font-semibold" data-testid="current-info">
                {currentInfo}
              </span>
            ) : (
              currentInfo
            )}
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            className="font-normal"
            onClick={handleToggle}
            type={state ? "reset" : "button"}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? "İptal" : "Düzenle"}
          </Button>
        </div>
      </div>

      {/* Success state */}
      <Collapsible open={isSuccess}>
        <CollapsibleContent
          className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            },
          )}
          data-testid="success-message"
        >
          <Badge className="my-4" variant="default">
            <span>{label} güncellendi</span>
          </Badge>
        </CollapsibleContent>
      </Collapsible>

      {/* Error state  */}
      <Collapsible open={isError}>
        <CollapsibleContent
          className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": isError,
              "max-h-0 opacity-0": !isError,
            },
          )}
          data-testid="error-message"
        >
          <Badge className="my-4" variant="destructive">
            <span>{errorMessage}</span>
          </Badge>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={state}>
        <CollapsibleContent
          className={cn(
            "overflow-visible transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            },
          )}
        >
          <div className="flex flex-col gap-y-2 py-4">
            <div>{children}</div>
            <div className="mt-2 flex items-center justify-end">
              <Button
                disabled={pending}
                className="w-full sm:max-w-[140px]"
                type="submit"
                data-testid="save-button"
              >
                {pending ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Kaydet
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AccountInfo;
