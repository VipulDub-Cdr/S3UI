"use client"
import * as React from 'react'
import { LoaderOneDemo } from './loader'
import { UserButton, useUser } from "@clerk/nextjs";

import { 
    Home, 
    FolderOpen, 
    Users, 
    Palette, 
    ExternalLink, 
    HelpCircle, 
    Settings,
    Search,
    ChevronDown,
    FileText,
    FolderPlus,
    Building2,
    Plus,
    Menu,
    X
} from 'lucide-react'

const Dashboard: React.FC = () => {
    const { isLoaded, user } = useUser();
    const [files, setfiles] = React.useState<string[]>([])
    const [folders, setfolders] = React.useState<string[]>([])
    const [path, setpath] = React.useState<string>("Loading...");
    const [uploading, setUploading] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(true);
    const [foldersExpanded, setFoldersExpanded] = React.useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

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
        if (url) {
            window.open(url, '_blank')
        }
    }

    async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
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
        await fetch(uploadURl, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file,
        })

        setUploading(false);
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
        fetchOnClick(path);
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="relative p-6 border-b border-gray-200">
                    <button
                        type="button"
                        className="md:hidden absolute right-4 top-4 p-2 rounded-md hover:bg-gray-100"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">UI</span>
                        </div>
                        <div className='w-[70%]'>
                            <h2 className="font-semibold text-gray-900">Dashboard</h2>
                            <p className="text-sm text-gray-500 overflow-hidden">{user?.emailAddresses[0].emailAddress}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2 bg-gray-100 rounded-lg">
                        <Home className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-900 font-medium">Home</span>
                    </div>

                    <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <FileText className="w-5 h-5" />
                        <span>My projects</span>
                    </div>

                    <div>
                        <div 
                            className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
                            onClick={() => setFoldersExpanded(!foldersExpanded)}
                        >
                            <div className="flex items-center space-x-3">
                                <FolderOpen className="w-5 h-5" />
                                <span>Folders</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${foldersExpanded ? 'rotate-180' : ''}`} />
                        </div>
                        
                        {foldersExpanded && (
                            <div className="ml-8 mt-2 space-y-1">
                                {(folders ?? []).map((item: string, index: number) => (
                                <div key={index} className='flex items-center justify-between px-4 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
                                    <div className="flex items-center space-x-3">
                                        <button 
                                            onClick={() => fetchOnClick(item)} 
                                            className="text-left hover:cursor-pointer text-gray-900 font-md"
                                        >
                                            {item.substring(33)==""? "Click here" : item.substring(33)}
                                        </button>
                                    </div>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <FolderPlus className="w-5 h-5" />
                        <span>All files</span>
                    </div>

                    <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <Users className="w-5 h-5" />
                        <span>Team members</span>
                    </div>

                    <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <Palette className="w-5 h-5" />
                        <span>Appearance</span>
                    </div>

                    {/* Open in browser */}
                    <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <ExternalLink className="w-5 h-5" />
                        <span>Open in browser</span>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-200 space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <HelpCircle className="w-5 h-5" />
                        <span>Support</span>
                    </div>
                    <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </div>
                </div>
            </aside>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col">
                {/* Top Navigation Bar */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="md:hidden p-2 rounded-md hover:bg-gray-100"
                                onClick={() => setIsSidebarOpen(true)}
                                aria-label="Open sidebar"
                            >
                                <Menu className="w-5 h-5 text-gray-700" />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-900">Welcome back</h1>
                        </div>
                        
                        {/*saerch bar*/}
                        <div className="hidden md:block flex-1 max-w-md mx-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* userButton and Name*/}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                                <span className="hidden sm:inline text-lg font-semibold text-gray-900">{user?.fullName}</span>
                            </div>

                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium"><UserButton/></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nvbar ke neeche*/}
                <div className="bg-white px-6 py-6 border-b border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button className="hover:cursor-pointer flex flex-col items-center justify-center p-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                            <Plus className="w-8 h-8 text-gray-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">New document</span>
                        </button>
                        <button className="hover:cursor-pointer flex flex-col items-center justify-center p-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                            <FileText className="w-8 h-8 text-gray-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">New project</span>
                        </button>
                        <button className="hover:cursor-pointer flex flex-col items-center justify-center p-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                            <Users className="w-8 h-8 text-gray-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">New team</span>
                        </button>
                        <button className="hover:cursor-pointer flex flex-col items-center justify-center p-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                            <Building2 className="w-8 h-8 text-gray-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">New organization</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 overflow-auto">
                    {/* Go back button */}
                    <div className="flex items-center justify-between mb-6">
                        <button 
                            className="h-10 w-10 hover:cursor-pointer rounded-full transition delay-50 duration-100 hover:bg-gray-100 flex items-center justify-center" 
                            type="button" 
                            onClick={() => fetchOnClick(getPreviousPath(path))}
                        >
                            <img src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" alt="Go back" />
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">All Files and Folders</h2>

                    {loading ? (
                        <div className="flex justify-center items-center mt-10">
                            <LoaderOneDemo/>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {/* Displaying all the Folders */}
                            {(folders ?? []).map((item: string, index: number) => (
                                <div key={index} className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
                                    <div className="flex items-center space-x-3">
                                        <img className={`${item.substring(33)==""? "collapse" : "visible"} w-8 h-8`} src="https://img.icons8.com/?size=100&id=67363&format=png&color=000000"/>
                                        <button 
                                            onClick={() => fetchOnClick(item)} 
                                            className="text-left hover:cursor-pointer text-gray-900 font-medium"
                                        >
                                            {item.substring(33)==""? "Click here" : item.substring(33)}
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/*Displaying all the files Files */}
                            {(files ?? []).map((item: string, index: number) => (
                                item.substring(33) ? (
                                    <div key={item} className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
                                        <div className='flex items-center space-x-3'>
                                            <img className="w-8 h-8" src="https://img.icons8.com/?size=100&id=67464&format=png&color=000000" alt="File" />
                                            <span className='text-gray-900 font-medium max-w-xs truncate'>{item.substring(33)}</span>
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <button 
                                                onClick={() => callDownloadroute(item)} 
                                                className='px-3 py-1.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors text-sm font-medium'
                                            >
                                                Download
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => deleteFile(item)} 
                                                className="px-3 py-1.5 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 transition-colors text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ) : null
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Button - Fixed Position */}
            <div className="fixed bottom-6 right-6">
                <div className="relative">
                    <div className="lg:w-32 lg:h-32 w-25 h-25 p-3 border-2 border-dashed border-gray-300 bg-gray-300/80 rounded-xl flex flex-col justify-center items-center transition-all duration-300 hover:scale-x-110 hover:scale-y-110 hover:-translate-y-1">
                        <label htmlFor="fileUpload" className="cursor-pointer">
                            <img
                                className="h-8"
                                src="https://img.icons8.com/?size=100&id=TDaRPAsMt1Bs&format=png&color=000000"
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
                        <p className="text-md mt-1">Upload</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard