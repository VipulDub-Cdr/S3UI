"use client";
import { motion } from "motion/react";
// import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import MarqueeExample from "./marquee";
import React, { useState } from "react";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";


export function HeroHighlightDemo() {

  return (
    <div className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-black dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto">

        {/* Navbar */}

        <div className={`flex flex-row justify-between bg-white text-black py-2 px-2 text-[1.2rem] lg:text-[1.3rem] font-normal shadow-xl/20 Subscribe
shadow-blue-500/50 sticky top-[5%] lg:top-[6%] z-1000 md:mb-[10%] lg:mb-[10%] rounded-3xl dark:bg-black dark:text-white`}>
          <div className="flex flex-row justify-start gap-4">
            {/* <div className="border-2 rounded-full w-10 h-8">
              <img className="w-full h-full object-cover rounded-xl" src="/s3ui.png" alt="" />
            </div> */}
            <div className="flex flex-row justify-center items-center px-2 text-slate-600 bg-slate-300 rounded-2xl font-semibold">S3UI</div>
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <Link href="/register">
              <button className="my-1 flex flex-row justify-center items-center text-[1.2rem] font-semibold hover:cursor-pointer transition delay-50">Sign Up</button>
            </Link>
            <Link href="/login">
              <button className="hover:cursor-pointer text-white lg:pb-1 bg-[#0077FF] rounded-2xl px-3 transition delay-100 duration-300 hover:bg-[#1971d6]">Sign in</button>
            </Link>
          </div>
        </div>

        {/* Hero content */}

        <div className="mt-[10%] lg:mt-0 flex flex-col gap-2 lg:gap-1 justify-center items-center pt-[10%] md:pt-0 lg:pt-0">



          <div className="text-wrap">
            <span className="text-[2rem] md:text-5xl font-medium text-tight">Say Goodbye To <span className="text-white">Local Storage</span> Limitations </span>
            {/* <div className="lg:h-0 lg:collapse "><br /></div> */}
            <span className="text-[1.9rem] md:text-5xl font-medium text-black">
                With Our Cloud Platform
            </span>
          </div>

          <div className="text-neutral-600 font-medium px-2 text-[1.2rem] mt-[3%] dark:text-neutral-200 dark:bg-black text-wrap">
            Welcome to the future of storage! Say goodbye to the limitations of physical devices and embrace the freedom of cloud storage.
          </div>

          <a href="">
            <div className="text-white text-[1.4rem] mt-[10%] font-medium">
              <button className="p-3 rounded-2xl transition delay-100 duration-300 ease-in-out hover:cursor-pointer bg-gradient-to-r from-slate-400 to-slate-500 hover:translate-y-[-0.2rem]">Explore S3UI for Free</button>
            </div>
          </a>

          <div className="w-[80vw] lg:w-[50vw] md:[50w] mt-[6%]">
            <div className="text-neutral-600 text-[1.2rem] mb-[5%] lg:mb-6">Built with</div>
            <MarqueeExample />
          </div>

        </div>

    </div>
    
  );
}