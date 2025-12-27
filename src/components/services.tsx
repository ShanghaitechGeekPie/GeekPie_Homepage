import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { cn } from "@/lib/utils";

export function Services({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden",
        className,
      )}
    >
      <OrbitingCircles iconSize={40}>
        <Icons.cb />
        <Icons.opentech />
        <Icons.hpc />
        <Icons.aoscc />
        <Icons.run />
        <Icons.hydro />
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        <Icons.mirror />
        <Icons.prettier />
        <Icons.asfr />
        <Icons.lug />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  mirror: () => <span className="text-xl font-bold">Mirror</span>,
  opentech: () => (
    <img src="/assets/opentech.png" alt="OpenTech" className="rounded-full" />
  ),
  cb: () => <img src="/assets/coursebench.svg" alt="CourseBench" />,
  prettier: () => (
    <span className="text-xl leading-none font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,#7bb4e6,#e6c944,#f3b6cd)]">
      Course
      <br />
      Prettier
    </span>
  ),
  hpc: () => <img src="/assets/geekpie-hpc-logo.png" alt="GeekPie HPC" />,
  aoscc: () => <img src="/assets/aosc.png" alt="AOSCC" />,
  asfr: () => <span className="text-xl font-bold">ASFR</span>,
  run: () => <img src="/assets/run.svg" alt="Run" />,
  lug: () => <span className="text-xl font-bold">LUG</span>,
  hydro: () => <img src="/assets/hydro.png" alt="Hydro" />,
};
