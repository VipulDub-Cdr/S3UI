import React from 'react';
import { TypingAnimation } from "@/components/magicui/typing-animation";

interface MyComponentProps {
    url: string;
    heading: string;
    description: string;
}


export default function Secondpage() {
    return <div className="h-full w-full flex flex-col justify-center items-center md:justify-start py-8">

        <div className="w-full">
            <div className='my-2 p-1 flex flex-col justify-center items-center text-[2rem]/6 md:text-[2.6rem]/7 font-normal gap-5 lg:my-6'>
                Upload and Manage
                <div className='text-blacks p-3 rounded-2xl bg-[#f0efef]'>Anywhere</div>
            </div>

            <div className='pl-10 lg:pl-0 w-full flex flex-row justify-center items-center lg:ml-0'>
                <div className='text-xl tracking-wide text-slate-800 text-wrap'>Access the data instantly and empower seamless storage.</div>
            </div>
        </div>

        <div className='mx-7 my-4 lg:mx-5 lg:my-6'><BigCardImageRight url="./sampleImageHeroPage.png" heading="Seamless Cloud Management" description='Manage files and folders effortlessly with upload, download, delete, and navigation features powered by secure AWS S3 integration.' /></div>
        
        <div className='mx-7 my-4 lg:mx-5 lg:my-6'><BigCardImageLeft url="./cardsampleresponsive.png" heading="Optimized User Experience" description='Responsive UI with Tailwind CSS, interactive navigation, and custom loaders provides smooth, efficient file operations on any device.' /></div>
        
        <div className='mx-7 my-4 lg:mx-5 lg:my-6'><BigCardImageRight url="./cardthirdimage.png" heading="All-in-One File Management Dashboard" description='Easily manage your files with a secure, responsive dashboard powered by Next.js and AWS S3.
        Clerk authentication provides safe, personalized access with smooth navigation and real-time feedback.
        Upload, download, delete, and organize your data seamlessly from any device.' /></div>


    </div>
}

const BigCardImageRight: React.FC<MyComponentProps> = ({ url, heading, description }) => {
    return (

        <div className='w-full h-full lg:h-[65vh] rounded-2xl flex flex-col lg:flex-row-reverse justify-start items-start gap-3  bg-[#F4F4F4]'>
            <img src={url} alt={url} className="w-full h-full object-cover rounded-2xl bg-amber-50" />

            <div className='lg:mx-15 lg:w-full lg:h-full flex flex-col justify-start items-start gap-2 lg:gap-3 my-1 lg:my-0 md:justify-center md:items-start px-1 lg:px-0'>
                <div className="text-[1.6rem]/7 tracking-tight line opacity-95 text-wrap font-sans">{heading}</div>

                <div className="text-gray-800 md:w-[60%]">{description}</div>

                <button className="rounded-2xl lg:rounded-lg px-4 py-1 text-white font-medium bg-black my-1 hover:cursor-pointer hover:bg-white hover:text-black hover:border-1 hover:border-black" onClick={() => { window.open("") }}>
                    Try for free
                </button>
            </div>
        </div>



    )
}
const BigCardImageLeft: React.FC<MyComponentProps> = ({ url, heading, description }) => {
    return (

        <div className='w-full h-full lg:h-[65vh] rounded-2xl flex flex-col lg:flex-row justify-start items-start gap-3  bg-[#F4F4F4]'>
            <img src={url} alt={url} className="w-full h-full object-cover rounded-2xl bg-amber-50" />

            <div className='lg:mx-15 lg:w-full lg:h-full flex flex-col justify-start items-start gap-2 lg:gap-3 my-1 lg:my-0 md:justify-center md:items-start px-1 lg:px-0'>
                <div className="text-[1.6rem]/7 tracking-tight line opacity-95 text-wrap font-sans">{heading}</div>

                <div className="text-gray-800 md:w-[60%]">{description}</div>

                <button className="rounded-2xl lg:rounded-lg px-4 py-1 text-white font-medium bg-black hover:cursor-pointer hover:bg-white hover:text-black hover:border-1 hover:border-black my-1" onClick={() => { window.open("") }}>
                    Try for free
                </button>
            </div>
        </div>



    )
}

function FloatingCard() {
    return <div>floating card</div>
}