"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import cs from "classnames";
import { BsAmd } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function Companies({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cs("flex h-[300px] w-full items-center justify-center overflow-hidden px-10", className)}
      ref={containerRef}
    >
      <div className="flex size-full max-h-[250px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Icons.jumpTrading />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.sixie />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <Icons.nvidia />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <Icons.geekpie />
          </Circle>
          <Circle ref={div6Ref}>
            <Icons.deemos />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <Icons.google />
          </Circle>
          <Circle ref={div7Ref}>
            <Icons.amd />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
    </div>
  );
}

const Icons = {
  nvidia: () => (
    <img
      src="/com/nvidia.png"
      alt="Nvidia Logo"
      className="rounded-full scale-125"
    />
  ),
  geekpie: () => (
    <img
      src="/geekpie_icon.png"
      alt="GeekPie Logo"
      className="rounded-full scale-125"
    />
  ),
  jumpTrading: () => (
    <img
      src="/com/jump.png"
      alt="JumpTrading Logo"
      className="rounded-full scale-150"
    />
  ),
  google: () => (
    <FcGoogle />
  ),
  sixie: () => (
    <img
      src="/com/sixie.png"
      alt="Sixie Capital Logo"
      className=""
    />
  ),
  deemos: () => (
    <span className="text-xs scale-75 font-bold">Deemos</span>
  ),
  amd: () => (
    <BsAmd />
  ),
};
