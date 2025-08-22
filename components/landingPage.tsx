"use client";

import { SignedOut } from "@clerk/nextjs";
import { HeroHighlightDemo } from "./heropage";
// import { SecondPage } from "./secondPage";
// import { StickyScrollRevealDemo } from "@/components/stickyScroll"

export default function LandingPage() {
  return (
    <SignedOut>
      {/* lg:bg-[url('/largeimage.png')]  */}
      <div className=" w-[100vw] h-[100vh] bg-[url('/image.png')]  bg-cover bg-center bg-no-repeat">
        <HeroHighlightDemo />
      </div>
      {/* <StickyScrollRevealDemo/> */}
      {/* <SecondPage/> */}
    </SignedOut>
  );
}
