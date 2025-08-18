"use client";
import { motion } from "motion/react";
// import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import MarqueeExample from "./marquee";
import React, { useState } from "react";
import { SignIn } from "@clerk/nextjs";

export function HeroHighlightDemo() {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-black dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >

        

        {/* Navbar */}

        <div className={`flex flex-row justify-between bg-white text-black py-2 px-2 text-[1.2rem] font-normal shadow-xl/20 Subscribe
shadow-blue-500/50 sticky top-[6%] z-1000 md:mb-[10%] lg:mb-[10%]`}>
          <div className="flex flex-row justify-start gap-4">
            <div className="border-2 rounded-full w-10 h-8">
              {/* <img src="https://cdn-icons-png.freepik.com/512/3838/3838984.png" alt="" /> */}
            </div>
            <div>Logo</div>
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <button className="text-amber-400 hover:cursor-pointer collapse md:visible lg:visible">Premium</button>
            <button className="hover:cursor-pointer" onClick={() => setOpen(!open)}>Sign Up</button>
          </div>
        </div>

        {/* Hero content */}

        <div className="flex flex-col gap-2 lg:gap-1 justify-center items-center pt-[10%] md:pt-0 lg:pt-0">

          {/* SignIn page */}

          <div className={`z-1500 flex flex-row justify-center items-center absolute transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16 pointer-events-none"}`}>
            <SignIn routing="hash" />
          </div>

          <div className="text-wrap">
            <span className="text-[2rem] md:text-5xl">Lorem ipsum dolor sit amet consectetur thats it.</span>
            <span>
              <br />
              <Highlight className="text-black dark:text-white w-[80%] text-[2rem]">
                copy,of a copy,of a copy.
              </Highlight>
            </span>
          </div>

          <div className="text-neutral-700 text-[1.2rem] mt-[3%]">
            Microlaunch helps you get reviews, exposure and first sales over 30 days. Discover our Premium packs and get long-term Traffic and Sales.
          </div>

          <div className="text-white text-[1.4rem] mt-[2%] font-medium">
            <button className="p-3 rounded-2xl transition delay-100 duration-300 ease-in-out hover:cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-400 hover:translate-y-[-0.2rem] hover:shadow-xl hover:shadow-purple-200" onClick={()=>setOpen(!open)}>Try CloudStorage for free</button>
          </div>

          <div className="w-[80vw] lg:w-[50vw] md:[50w] mt-[5%]">
            <div className="text-neutral-600 text-[1.2rem] mb-[5%] lg:mb-6">Built with</div>
            <MarqueeExample />
          </div>

        </div>
      </motion.h1>
    </HeroHighlight>
  );
}
