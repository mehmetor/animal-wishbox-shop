"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { MagicCard } from "@/components/magicui/magic-card";
import { Loader } from "lucide-react";

export type MagicSwitchCardProps = {
  title: string;
  description?: string | ReactNode;
  rightContent?: string | ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  testId?: string;
};

export const MagicSwitchCard = ({
  title,
  description,
  rightContent,
  checked,
  onCheckedChange,
  onClick,
  disabled = false,
  isLoading = false,
  className,
  testId = "magic-switch-card",
}: MagicSwitchCardProps) => {
  const handleCardClick = () => {
    if (!disabled && !isLoading && onClick) {
      onClick();
    } else if (!disabled && !isLoading) {
      onCheckedChange(!checked);
    }
  };

  return (
    <MagicCard className={cn("rounded-lg border", className)}>
      <div
        onClick={handleCardClick}
        data-testid={testId}
        className={cn(
          "flex cursor-pointer flex-row items-center justify-between p-4",
          {
            "cursor-not-allowed opacity-60": disabled || isLoading,
          },
        )}
      >
        <div className="space-y-0.5">
          <span className="text-foreground font-medium">{title}</span>
          {description &&
            (typeof description == "string" ? (
              <p className="text-muted-foreground text-sm">{description}</p>
            ) : (
              description
            ))}
        </div>
        <div className="flex items-center gap-2">
          {rightContent && (
            <div className="text-foreground justify-self-end font-medium">
              {isLoading ? <Loader className="animate-spin" /> : rightContent}
            </div>
          )}
          <Switch
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled || isLoading}
          />
        </div>
      </div>
    </MagicCard>
  );
};
