import { Marquee } from "@/components/magicui/marquee";
import cs from "classnames";
import { FaBoxesPacking, FaReact, FaRust } from "react-icons/fa6";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiArduino,
  SiKubernetes,
  SiNixos,
  SiOcaml,
  SiVuedotjs,
} from "react-icons/si";
import { TbLetterV } from "react-icons/tb";

const techStacks = [
  {
    name: "Rust",
    src: <FaRust className="h-15 w-15" />,
  },
  {
    name: "OCaml",
    src: <SiOcaml className="h-15 w-15" />,
  },
  {
    name: "React",
    src: <FaReact className="h-15 w-15" />,
  },
  {
    name: "Next.js",
    src: <RiNextjsFill className="h-15 w-15" />,
  },
  {
    name: "Vue.js",
    src: <SiVuedotjs className="h-15 w-15" />,
  },
  {
    name: "Arduino",
    src: <SiArduino className="h-15 w-15" />,
  },
  {
    name: "Spack",
    src: <FaBoxesPacking className="h-15 w-15" />,
  },
  {
    name: "Verilog",
    src: <TbLetterV className="h-15 w-15" />,
  },
  {
    name: "k8s",
    src: <SiKubernetes className="h-15 w-15" />,
  },
  {
    name: "Nix OS",
    src: <SiNixos className="h-15 w-15" />,
  },
];
const competitions = [
  {
    name: "ICPC",
    src: "/com/icpc.ico",
  },
  {
    name: "SC24",
    src: "/com/sc24.svg",
  },
  {
    name: "HPC Game",
    src: "/com/hpcgame.svg",
  },
  {
    name: "CCPC",
    src: "/com/ccpc.png",
  },
  {
    name: "ASC",
    src: "/com/asc.png",
  },
];

export function TechStacks({ className }: { className?: string }) {
  return (
    <div className={cs(className, "transition-all hover:blur-xs h-full")}>
      <Marquee className={cs("opacity-50")} reverse>
        {competitions.map((comp, index) => (
          <div key={index}>
            <img src={comp.src} alt={comp.name} className="h-15 w-fit" />
            <p className="text-center font-bold">{comp.name}</p>
          </div>
        ))}
      </Marquee>
      <Marquee className={cs("opacity-10")}>
        {techStacks.map((stack, index) => (
          <div key={index}>
            {stack.src}
            <p className="text-center text-sm font-bold">{stack.name}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
