"use client";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { leaders, alumni } from "@/statics/members";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PeoplesPage() {
  return (
    <>
      <div className="container mx-auto py-6 px-4 max-w-5xl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Members</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-6xl font-bold my-5">Meet GeekPie</h1>

      <div className="mx-5">
        <section className="py-5 md:py-10">
          <div className="mx-auto max-w-5xl border-t px-6">
            <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
              <div className="sm:w-2/5 flex justify-center items-center">
                <h2 className="text-3xl font-bold sm:text-4xl">Leadership</h2>
              </div>
              <div className="mt-6 sm:mt-0">
                <p>
                  江山代有才人出。
                  <br />
                  GeekPie_ 的多元方向，
                  <br />
                  离不开强而有力的骨干力量。
                </p>
              </div>
            </div>
            <div className="mt-12 md:mt-24">
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {leaders.map((member, index) => (
                  <Link href={member.url} key={index} className="group">
                    <img
                      className="group-hover:shadow-md h-80 w-full rounded-md object-cover object-top transition-all duration-500 group-hover:h-[22.5rem]"
                      src={member.image}
                      alt="team member"
                      width="800"
                      height="800"
                    />
                    <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-normal group-hover:text-lg group-hover:font-bold">
                          {member.title}
                        </h3>
                        <span className="text-xs group-hover:text-sm transition-all duration-500 ">
                          {member.handle}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-muted-foreground inline-block text-sm transition duration-300">
                          {member.subtitle}
                        </span>
                        <div className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100">
                          Link
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="py-5 md:py-10">
          <div className="mx-auto max-w-5xl border-t px-6">
            <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
              <div className="sm:w-2/5 flex justify-center items-center">
                <h2 className="text-3xl font-bold sm:text-4xl">Alumni</h2>
              </div>
              <div className="mt-6 sm:mt-0">
                <p>
                  GeekPie_ 学生社团自 2014 年创立以来，
                  <br />
                  无数的优秀人才从这里走出，
                  <br />
                  成为各行各业的新星。
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row mb-0 gap-3 items-center justify-end">
              <div className="text-sm text-muted-foreground">
                在 Linkedin 上关注我们的动向
              </div>
              <InteractiveHoverButton className="justify-self-end">
                <a
                  href={"https://www.linkedin.com/company/geekpie/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GeekPie
                </a>
              </InteractiveHoverButton>
              <InteractiveHoverButton className="justify-self-end">
                <a
                  href={
                    "https://www.linkedin.com/company/shanghaitech-geekpie-hpc-team/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GeekPie_HPC
                </a>
              </InteractiveHoverButton>
            </div>
            <div className="mt-6 md:mt-24">
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {alumni.map((member, index) => (
                  <Link href={member.url} key={index} className="group">
                    <img
                      className="group-hover:shadow-md h-80 w-full rounded-md object-cover object-top transition-all duration-500 group-hover:h-[22.5rem]"
                      src={member.image}
                      alt="team member"
                      width="800"
                      height="800"
                    />
                    <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wide group-hover:text-lg group-hover:font-bold">
                          {member.title}
                        </h3>
                        <span className="text-xs group-hover:text-sm transition-all duration-500 ">
                          {member.handle}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-muted-foreground inline-block text-sm transition duration-300">
                          {member.subtitle}
                        </span>
                        <div className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100">
                          Link
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <h2 className="text-5xl font-bold my-12">alumni</h2>       */}
    </>
  );
}
