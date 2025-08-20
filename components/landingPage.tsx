"use client";

import { SignedOut } from "@clerk/nextjs";
import { HeroHighlightDemo } from "./heropage";
// import { SecondPage } from "./secondPage";
// import { StickyScrollRevealDemo } from "@/components/stickyScroll"

export default function LandingPage() {
  return (
    <SignedOut>
      <HeroHighlightDemo />
      {/* <StickyScrollRevealDemo/> */}
      {/* <SecondPage/> */}
    </SignedOut>
  );
}
