'use client';

import { useAuth } from '@/lib/auth-context';
import Home from "@/components/dashboard";
import { HeroHighlightDemo } from "@/components/heropage";
import Secondpage from "@/components/secpage";

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return <Home />;
  }

  return (
    <>
      {/* Landing page for unauthenticated users */}
      <div className=" w-[100vw] h-[100vh] bg-[url('/image.png')]  bg-cover bg-center bg-no-repeat">
        <HeroHighlightDemo />
      </div>
      <div className="w-[100vw] h-[100%] relative">
        {/* Second page goes here */}
        <Secondpage />
      </div>
    </>
  );
}
