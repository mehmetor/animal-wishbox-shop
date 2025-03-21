import CopyButton from "@/components/copy-button";
import { cn } from "@/lib/utils";

type OrderNumberProps = {
  id: string | number | null | undefined;
  label?: string;
  className?: string;
  showCopyButton?: boolean;
};

/**
 * Sipariş numarasını formatlayıp gösteren bileşen.
 * Sipariş numarasını "AW 0000 0001" formatında formatlar ve gösterir.
 * Kopyalama butonu içerir.
 */
const OrderNumber = ({
  id,
  label = "Sipariş numarası",
  className,
  showCopyButton = true,
}: OrderNumberProps) => {
  const formatOrderId = (id: string | number): string => {
    if (!id) return "";

    // Sayıyı stringe dönüştür ve başına sıfır ekleyerek 8 karaktere tamamla
    const paddedId = id.toString().padStart(8, "0");

    // "AW 0000 0001" formatına dönüştür
    return `AW ${paddedId.slice(0, 4)} ${paddedId.slice(4, 8)}`;
  };

  const formattedId = id ? formatOrderId(id) : "";

  return (
    <div className={cn("flex items-center gap-x-2 ", className)}>
      <span className="text-muted-foreground">{label && `${label}: `}</span>
      <span className="font-semibold" data-testid="order-number">
        {formattedId}
      </span>
      {showCopyButton && formattedId && (
        <CopyButton textToCopy={formattedId} label={label} />
      )}
    </div>
  );
};

export default OrderNumber;
