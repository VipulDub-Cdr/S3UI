import Image from "next/image";
import NavBar from "@/components/nav";
import Dashboard from "@/components/dashboard";

export default function Home() {
  return <div>
            <div className="w-full m-0 p-2 bg-gradient-to-b from-[#297DFE] to-[#1862FD] text-white text-[1.1rem] flex flex-row justify-center items-center">More Functionalities Coming Soon...</div>
            <NavBar />
            <Dashboard/> 
        </div>
}
