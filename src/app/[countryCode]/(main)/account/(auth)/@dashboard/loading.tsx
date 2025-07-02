import Spinner from "@modules/common/icons/spinner";

export default function Loading() {
  return (
    <div className="text-foreground flex h-full w-full items-center justify-center">
      <Spinner size={32} />
    </div>
  );
}
