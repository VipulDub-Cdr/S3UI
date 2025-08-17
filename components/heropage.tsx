"use client";
import { motion } from "motion/react";
// import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import MarqueeExample from "./marquee";

export function HeroHighlightDemo() {
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

        <div className="flex flex-row justify-between bg-white text-black py-2 px-2 text-[1.2rem] font-normal mb-[15%] shadow-xl/20 sticky top-[6%] z-1000 rounded-xl md:mb-[15%] lg:mb-[15%]">
            <div className="flex flex-row justify-start gap-4">
              <div className="border-2 rounded-full w-10 h-8">
                <img src="https://cdn-icons-png.freepik.com/512/3838/3838984.png" alt="" />
              </div>
              <div>Logo</div>
            </div>
            <div className="flex flex-row gap-4 justify-between">
              <button className="text-amber-400">Premium</button>
              <button>Sign Up</button>
            </div>
        </div>

        <div className="flex flex-col gap-2 lg:gap-1 justify-center items-center">

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
            <button className="p-3 rounded-2xl transition delay-100 duration-400 ease-in-out hover:cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-400 hover:translate-x-2">Try CloudStorage for free</button>
          </div>

          <div className="w-[80vw] lg:w-[50vw] md:[50w] mt-[5%]">
            <div className="text-neutral-700 text-[1.2rem] mb-[5%] lg:mb-4">Built with</div>
            <MarqueeExample/>
          </div>

        </div>
      </motion.h1>
    </HeroHighlight>
  );
}
