import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function PeoplesLayout({ children }: { children: React.ReactNode }) {
  return (

    <div className="p-6 flex flex-col w-full">
      <div className="flex flex-col items-center justify-center">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(80vh_circle_at_center,white,transparent)]",
            "fixed -z-1"
          )}
        />
        {children}
      </div>
    </div>
  );
}