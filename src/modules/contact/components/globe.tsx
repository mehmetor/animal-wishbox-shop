import { Globe } from "@/components/magicui/globe";

const GlobeComponent = () => {
  return (
    <div className="bg-background relative flex size-full max-w-xl items-center justify-center overflow-hidden rounded-lg border px-40 h-96">
      <Globe />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
};

export default GlobeComponent;
