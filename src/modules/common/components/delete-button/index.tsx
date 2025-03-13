import { deleteLineItem } from "@lib/data/cart";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DeleteButton = ({
  id,
  children,
  className,
  title,
}: {
  id: string;
  children?: React.ReactNode;
  className?: string;
  title?: string;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false);
    });
  };

  return (
    <div
      className={cn(
        "text-sm font-normal flex items-center justify-between",
        className,
      )}
    >
      <Button
        variant="outline"
        // className="text-muted-foreground"
        size={children ? "default" : "icon"}
        onClick={() => handleDelete(id)}
        disabled={isDeleting}
        title={title}
      >
        {isDeleting ? (
          <>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          <>
            <Trash />
            {children}
          </>
        )}
      </Button>
    </div>
  );
};

export default DeleteButton;
