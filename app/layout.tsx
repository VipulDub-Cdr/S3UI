import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider, SignedOut, SignIn, SignedIn} from '@clerk/nextjs'
import LandingPage from "@/components/landingPage";
import Home from "./page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Store your Files Securely",
//   description: "File Storage application",
// };

export const metadata = {
  title: 'Store your files securely',
  icons: {
    icon: '/vercel.png',
    // shortcut: '/shortcut-icon.png',
    // apple: '/apple-icon.png',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <LandingPage/>
                {/* <SignedOut>
                  <SignIn routing="hash"/>
                </SignedOut> */}
                <SignedIn>
                  <Home/>
                </SignedIn>
            </body>
      </html>
    </ClerkProvider>
  );
}
