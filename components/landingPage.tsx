"use client";

import { SignedOut } from "@clerk/nextjs";
import { HeroHighlightDemo } from "./heropage";
import Secondpage from "./secpage";
export default function LandingPage() {
  return (
    <SignedOut>
      {/* lg:bg-[url('/largeimage.png')]  */}
      <div className=" w-[100vw] h-[100vh] bg-[url('/image.png')]  bg-cover bg-center bg-no-repeat">
        <HeroHighlightDemo />
      </div>
      <div className="w-[100vw] h-[100%] relative">
        {/* Second page goes here */}
        <Secondpage/>
      </div>
    </SignedOut>
  );
}
