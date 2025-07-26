"use client"
import * as React from 'react'

const Dashboard: React.FC = () => {
    const [files, setfiles] = React.useState<any[]>([])
    const [folders, setfolders] = React.useState<any[]>([])
    const [path, setpath] = React.useState(null);
    React.useEffect(() => {
        let res;
        async function fetchData() {
            let fetchres = await fetch("/api/objects");
            res = await fetchres.json();
            setpath(res.userId)
            setfiles(res.files)
            setfolders(res.folderlist);
        }
        fetchData();
    }, [])
    React.useEffect(() => {
        console.log(files);
        console.log(folders);
    }, [files, folders])
    return <>
        <div className='border-2 mx-3 py-2 px-1'><h1 className='font-bold'>Path: </h1>{path}/</div>
        <div className='border-2 mx-3 py-2 px-1 my-2 '>
            <h1 className='font-bold'>Files:</h1>
            {files.map((item:string, index:number) => (
                <div key={index}>
                    <button>{item}</button>
                </div>
            ))}
            <h1 className='font-bold'>Folders(s):</h1>
            {folders.map((item:string, index:number) => (
                <div key={index}>
                    <button>{item}</button>
                </div>
            ))}
        </div>
    </>
}

export default Dashboard