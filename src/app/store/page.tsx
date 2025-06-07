"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import useSWR from 'swr';
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Lens } from "@/components/magicui/lens";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Label } from "@/components/ui/label";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { useState } from "react";


export default function ShoppingPage() {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(0);
  const products = [
    {
      id: 1,
      name: "智能手表 Pro",
      price: "¥1,299",
      // image: "/placeholder.svg?height=300&width=300",
      description: "全天候健康监测，超长续航",
    },
    {
      id: 2,
      name: "无线降噪耳机",
      price: "¥899",
      // image: "/placeholder.svg?height=300&width=300",
      description: "沉浸式音效，智能降噪",
    },
    {
      id: 3,
      name: "超薄折叠手机",
      price: "¥7,999",
      image: "/placeholder.svg?height=300&width=300",
      description: "创新折叠屏，强劲性能",
    },
    {
      id: 4,
      name: "智能家居套装",
      price: "¥2,499",
      image: "/placeholder.svg?height=300&width=300",
      description: "一键控制，智能互联",
    },
    {
      id: 5,
      name: "便携式投影仪",
      price: "¥3,299",
      image: "/placeholder.svg?height=300&width=300",
      description: "高清画质，随时随地",
    },
    {
      id: 6,
      name: "游戏笔记本电脑",
      price: "¥8,999",
      image: "/placeholder.svg?height=300&width=300",
      description: "强劲性能，酷炫外观",
    },
  ]

  return (
    <div className="p-6 flex flex-col w-full">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-[100%] skew-y-12",
          "fixed"
        )}
      />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-12">GeekPie_ Goods</h1>
        <main className="flex-1 w-full mx-auto max-w-6xl">
          <section className="py-12">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product, idx) => (
                  <BlurFade key={product.id} delay={0.25 + idx * 0.05} inView>
                    <Card
                      key={product.id}
                      className="group relative max-w-md shadow-none overflow-hidden rounded-lg border bg-background p-2 py-8 transition-all hover:shadow-md">
                      <CardHeader>
                        <Lens
                          zoomFactor={2}
                          lensSize={150}
                          isStatic={false}
                          ariaLabel="Zoom Area"
                        >
                          <img
                            src={product.image || "https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            alt="image placeholder"
                            loading={"lazy"}
                          // width={500}
                          // height={500}
                          />
                        </Lens>
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="text-2xl">{product.name}</CardTitle>
                        <CardDescription>
                          {product.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="space-x-4 flex justify-around items-center">
                        <Label className="text-lg font-bold flex-1">
                          {product.price}
                        </Label>
                        <InteractiveHoverButton onClick={() => { setOpen(true); setProductId(idx) }}>Details</InteractiveHoverButton>
                      </CardFooter>
                    </Card>
                  </BlurFade>
                ))}
              </div>
            </div>
          </section>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
              {/* <DrawerHeader className="text-left">
                <DrawerTitle className="text-2xl font-bold">Details</DrawerTitle>
              </DrawerHeader> */}
              <div className="overflow-auto [mask-image:linear-gradient(to_bottom,#000_90%,transparent_100%)]">
                <div className="flex flex-col items-center justify-center gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 w-full p-10 gap-10">
                    <img
                      src={products[productId]?.image || "https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                      alt="Product Image"
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-5 m-0 sm:m-10">
                      <h2 className="text-3xl sm:text-6xl font-bold">
                        {products[productId]?.name || "No title available."}
                      </h2>
                      <span className="text-2xl sm:text-4xl font-semibold">
                        {products[productId]?.price || "No price available."}
                      </span>
                      <span className="text-lg sm:text-xl text-muted-foreground">
                        {products[productId]?.description || "No description available."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button>
                    Learn More
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </main>
      </div>
    </div>
  );
}