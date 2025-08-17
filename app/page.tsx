import Image from "next/image";
import NavBar from "@/components/nav";
import Dashboard from "@/components/dashboard";
export default function Home() {
  return <div className="w-[100vw] h-[100vh] bg-black text-white">
            <NavBar />
            <Dashboard/>   
        </div>
}
