"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function NavBar() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return null; // or show a loader/skeleton
  }

  return (
    <>
      <nav className="px-3 py-2 dark:bg-neutral-900 dark:text-white flex justify-between items-center mb-3 lg:mx-1">
        <div className="flex flex-row justify-start items-center gap-2">
            <div className="h-10 w-10 rounded-xl border-2"><img className="w-full h-full object-cover rounded-xl" src="https://walker-web.imgix.net/cms/Gradient_builder_2.jpg?auto=format,compress&w=1920&h=1200&fit=crop&dpr=1.5" alt="" /></div>
            <div className="font-semibold text-[1.2rem]">S3UI</div>
        </div>
        <div className="mt-1 flex flex-row justify-between items-center gap-2 ">
          <div className="font-semibold text-[1.2rem]">{user?.fullName}</div>
          <UserButton/>
        </div>
      </nav>
    </>
  );
}
