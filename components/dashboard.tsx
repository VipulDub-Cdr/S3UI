"use client"
import * as React from 'react'
import { LoaderOneDemo } from './loader'
const Dashboard: React.FC = () => {
    const [files, setfiles] = React.useState<string[]>([])
    const [folders, setfolders] = React.useState<string[]>([])
    const [path, setpath] = React.useState<string>("Loading...");
    const [uploading, setUploading] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(true);

    // It takes the current path as a prop and returns the previous path
    function getPreviousPath(path: string) {
        const arr = path.split("/");
        let localprevPath = "";
        const len = arr.length;
        if (len <= 1) {
            return arr[0];
        }
        for (let i = 0; i < len - 2; i++) {
            localprevPath += arr[i] + "/";
        }
        // console.log(localprevPath)
        return localprevPath;
    }


    React.useEffect(() => {
        async function fetchData() {
            const fetchres = await fetch("/api/objects");
            const res = await fetchres.json();
            setpath(res.userId)
            setfiles(res.files)
            setfolders(res.folderlist);
            setLoading(false);
        }
        fetchData();
    }, [])

    // It calls the API and API returns the files and folders associted with the item path
    async function fetchOnClick(item: string) {
        //You need to just remove this logic to give the user Administrative access
        if (item == "") {
            alert("In the root directory");
            return;
        }
        setLoading(true);
        const response = await fetch("/api/folderdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prefix: item,
            }),
        });

        const data = await response.json();
        setfiles(data.files)
        setpath(item)
        // console.log(path);
        setfolders(data.folderlist)
        setLoading(false);
    }

    async function callDownloadroute(item: string) {
        const response = await fetch("/api/download", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prefix: item,
            })
        })
        const data = await response.json();
        const url = data.url;
        // console.log(data);
        if (url) {
            window.open(url, '_blank')
        }
    }

    async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
        // console.log(e.target.files?.[0]);
        const file = e.target.files?.[0];
        // console.log(file.name);
        // console.log(file.type);
        if (!file) return;
        setUploading(true);

        const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type,
                path: path,
            })
        })

        const { uploadURl } = await res.json();
        // console.log(typeof uploadURl);
        await fetch(uploadURl, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file,
        })
        // console.log(upload);

        setUploading(false);

        // if(upload.ok) alert("Upload successfull")
        // else alert("upload failed")

        e.target.value = "";

        fetchOnClick(path);
    }

    async function deleteFile(item: string) {

        await fetch("/api/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "path": item,
            })
        })

        // if(response) alert("Object deleted successfully")
        // else alert("Can't delete object")
        // console.log(path);
        fetchOnClick(path);
    }

    // Testing part
    // React.useEffect(() => {
    //     if (files && folders) {
    //         console.log(files);
    //         console.log(folders);
    //     } else {
    //         console.log("either files or folders is empty")
    //     }
    // }, [files, folders])


    // React.useEffect(()=>{
    //     console.log(path);
    // },[path]);

    return <div className='flex flex-row justify-around gap-0 '>

        {/* left side bar */}
        {/* <div className='border-r-2 border-slate-400 collapse md:visible md:w-60 md:ml-10]'></div> */}
        

        {/* upload old */}
        <div className="h-22 fixed top-[83%] left-[72%] lg:left-[86%] lg:top-[75%] lg:w-40 lg:h-40 p-3 border-3 text-black  border-dashed border-blue-400 bg-fixed w-20 flex flex-col rounded-xl justify-center items-center"></div>

        <div className=" fixed top-[83%] left-[72%] lg:left-[86%] lg:top-[75%] lg:w-40 lg:h-40 p-3 border-2 border-dashed border-gray-300 text-black bg-gray-300/80 bg-fixed w-20 flex flex-col rounded-xl justify-center items-center transition delay-100 duration-300 hover:translate-x-4 hover:-translate-y-4">
            <label htmlFor="fileUpload" className="cursor-pointer">
                <img
                    className="h-9"
                    src="https://img.icons8.com/?size=100&id=4716&format=png&color=000000"
                    alt="Upload"
                />
            </label>
            <input
                id="fileUpload"
                type="file"
                onChange={uploadFile}
                disabled={uploading}
                className="hidden"
            />
            <p>Upload</p>
        </div>



        {/* top bar */}
        <div className='w-[92%] mx-[4%] md:mx-[2%] flex flex-col justify-center gap-3'>

            <div className='font-bold text-[1.6rem]'>Welcome back</div>

            {/* <div className="w-full max-w-sm min-w-[200px]">
                <div className="relative">
                    <input
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder=""
                    />
                    <button
                        className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                        </svg>

                        Search
                    </button>
                </div>
            </div> */}

            <div className="border-1 border-slate-400"></div>

            {/* Go back button */}
            <div className="flex flex-row justify-between gap-2 my-1">
                <div className='flex flex-col  justify-start rounded-lg'>
                    <button className="h-10 w-10 hover:cursor-pointer rounded-full transition delay-50 duration-100 hover:bg-gray-100" type="button" onClick={() => fetchOnClick(getPreviousPath(path))}><img src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" alt="" /></button>
                </div>

                {/* <div className="border-2 border-slate-400 rounded-lg px-1 py-2">
                    {path}
                </div> */}

            </div>

            {/* <div className='w-full bg-blue-500 text-white rounded-lg text-xl p-2'>We are soon going to add the Create Folder functionality</div> */}

            <div className='text-[1.6rem] font-bold'>All Files and Folders</div>

            {loading ? <div className="flex flex-row justify-center items-center mt-10"><LoaderOneDemo/></div>:<div>

                {/* displaying all the folders */}
                
                {/* {folders?.length > 0 && <h1 className="font-bold">Folders:</h1>} */}
                {(folders ?? []).map((item: string, index: number) => (
                    <div key={index} className='flex flex-row justify-start items-center gap-2 border-2 border-slate-400 mb-2 pr-1 rounded-lg py-1 hover:bg-gray-200 transition delay-0 duration-200'>
                        <img className="w-10 h-10" src="https://img.icons8.com/?size=100&id=67363&format=png&color=000000" alt="" />
                        <button onClick={() => fetchOnClick(item)} className="hover:cursor-pointer overflow-hidden w[41%]" >{item.substring(33)}</button>
                    </div>
                ))}


                {/* displaying all the files */}

                {/* {files?.length > 0 && <h1 className="font-bold">Files:</h1>} */}
                {(files ?? []).map((item: string, index: number) => (
                    item.substring(33) ? <div key={item} className='flex flex-col'>
                        <div className='flex flex-row justify-between items-center gap-2 border-2 border-slate-400 mb-2 pr-1 rounded-lg py-1 hover:bg-gray-200 transition delay-0 duration-200'>
                            <div className='flex flex-row justify-start items-center gap-2 w-[50%]'>
                                <img className="w-10 h-10" src="https://img.icons8.com/?size=100&id=67464&format=png&color=000000" alt="" />
                                <p className='max-w-[60%] overflow-hidden'>{item.substring(33)}</p>
                            </div>
                            <div className='flex flex-row justify-end items-center gap-2 w-[50%]'>
                                {/* Download button */}
                                <button onClick={() => callDownloadroute(item)} className='px-2 py-1 rounded-lg text-white bg-[#1971D6] hover:cursor-pointer'>Download</button>
                                {/* Delete button */}
                                <button type="button" onClick={() => deleteFile(item)} className="px-2 py-1 rounded-lg text-white bg-yellow-400 hover:cursor-pointer hover:bg-yellow-500" >Delete</button>
                            </div>
                        </div>
                    </div> : null
                ))}

            </div>}

        </div>

        {/* right side bar */}
        {/* <div className='border-l-2 border-slate-400 collapse md:visible lg:w-80'></div> */}

    </div>
}

export default Dashboard