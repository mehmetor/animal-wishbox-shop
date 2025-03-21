import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const EditButton = ({
  handleEdit,
  visible = true,
  className,
}: {
  handleEdit: () => void;
  visible?: boolean;
  className?: string;
}) => {
  if (!visible) return null;
  return (
    <div className={cn("flex items-end justify-end", className)}>
      <Button
        size="default"
        className="font-normal"
        onClick={handleEdit}
        variant="outline"
        data-testid="edit-address-button"
      >
        Düzenle
        <Pencil />
      </Button>
    </div>
  );
};

export default EditButton;
