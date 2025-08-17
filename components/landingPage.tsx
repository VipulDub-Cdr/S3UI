"use client"

import { useState } from "react"
import {ClerkProvider, SignedOut, SignIn, SignedIn} from '@clerk/nextjs'
import { HeroHighlightDemo } from "./heropage";
export default function LandingPage(){
    const [open,setOpen] = useState<boolean>(false);
    return (
        <>
        <SignedOut>
            <HeroHighlightDemo/>
            {/* <h1>Landing Page</h1>
            <button type="button" onClick={()=>{setOpen(!open)}}>Sign In</button>
            <div className={open?"block":"hidden"}><SignIn routing="hash"/></div> */}
        </SignedOut>
        </>
    )
}