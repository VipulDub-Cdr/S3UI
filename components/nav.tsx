"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function NavBar() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return null; // or show a loader/skeleton
  }

  return (
    <>
      <nav className="px-3 py-2 dark:bg-neutral-900 dark:text-white flex justify-between items-center mb-3">
        <div className="flex flex-row justify-start items-center gap-2">
            <div className="h-8 w-8 rounded-full border-2"></div>
            <div className="font-semibold text-[1.2rem]">S3UI</div>
        </div>
        {/* <div>{user?.fullName}</div> */}
        <div className="mt-1">
          <UserButton />
        </div>
      </nav>
    </>
  );
}
