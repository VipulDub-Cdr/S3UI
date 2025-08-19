"use client";

import { SignedOut } from "@clerk/nextjs";
import { HeroHighlightDemo } from "./heropage";

export default function LandingPage() {
  return (
    <SignedOut>
      <HeroHighlightDemo />
    </SignedOut>
  );
}
