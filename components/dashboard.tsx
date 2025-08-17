"use client"
import * as React from 'react'
import Buttons from './bttn'
const Dashboard: React.FC = () => {
    const [files, setfiles] = React.useState<any[]>([])
    const [folders, setfolders] = React.useState<any[]>([])
    const [path, setpath] = React.useState<String>("Loading...");
    const [prevpath, setprevpath] = React.useState<String>("");
    const [uploading, setUploading] = React.useState<boolean>(false)

    // It takes the current path as a prop and returns the previous path
    function getPreviousPath(path: String){     
        const arr = path.split("/");
        let localprevPath = "";
        let len = arr.length;
        if(len<=1){
            return arr[0];
        }
        for(let i = 0;i<len-2;i++){
            localprevPath += arr[i]+"/";
        }
        // console.log(localprevPath)
        return localprevPath;
    }


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
    },[])

    // It calls the API and API returns the files and folders associted with the item path
    async function fetchOnClick(item: String) {
        //You need to just remove this logic to give the user Administrative access
        if(item==""){
            alert("In the root directory");
            return;
        }
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
    }

    async function callDownloadroute(item: String){
        const response = await fetch("/api/download",{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                prefix: item,
            })
        })
        const data = await response.json();
        const url = data.url;
        // console.log(data);
        if(url){
            window.open(url,'_blank')
        }
    }

    async function uploadFile(e:React.ChangeEvent<HTMLInputElement>){
        // console.log(e.target.files?.[0]);
        const file = e.target.files?.[0];
        // console.log(file.name);
        // console.log(file.type);
        if(!file) return;
        setUploading(true);

        const res = await fetch("/api/upload",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                fileName : file.name,
                fileType : file.type,
                path : path,
            })
        })

        const {uploadURl} = await res.json();
        // console.log(typeof uploadURl);
        const upload = await fetch(uploadURl,{
            method:"PUT",
            headers: {"Content-Type":file.type},
            body: file,
        })
        // console.log(upload);

        setUploading(false);

        // if(upload.ok) alert("Upload successfull")
        // else alert("upload failed")

        e.target.value = "";

        fetchOnClick(path);
    }

    async function deleteFile(item: String){

        const response = await fetch("/api/delete",{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "path":item,
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

    return <>
        <div className="flex flex-row">
            <button type="button" onClick={()=>fetchOnClick(getPreviousPath(path))} className='px-2 mx-3 my-1 border-2 hover:cursor-pointer'>Go Back</button>
            <div className="flex flex-row gap-2">
                <input type="file"  onChange={uploadFile} disabled={uploading} className="border-2 hover:cursor-pointer p-1"/>
                {uploading && <p>Uploading....</p>}
            </div>
        </div>
        <div className="border-2 mx-3 py-2 px-1">
            <h1 className="font-bold">Path: </h1>
            {path}
        </div>

        <div className="border-2 mx-3 py-2 px-1 my-2">
            {/* displaying all the files */}
            {files?.length > 0 && <h1 className="font-bold">Files:</h1>}
            {(files ?? []).map((item: string, index: number) => (
                <div className='flex justfiy-start gap-6'>
                    <div key={index}>
                        <i>{item}</i>
                        <button onClick={()=>callDownloadroute(item)} className='ml-6 p-1 border-2 border-white hover:cursor-pointer'>Download</button>
                        <button type="button" className="mx-1 border-2 p-1 hover:cursor-pointer" onClick={()=>deleteFile(item)}>Delete</button>
                    </div>
                </div>
            ))}
            {/* displaying all the folders */}
            {folders?.length > 0 && <h1 className="font-bold">Folders:</h1>}
            {(folders ?? []).map((item: string, index: number) => (
                <div key={index}>
                    <button onClick={() => fetchOnClick(item)} className="hover:cursor-pointer">{item}</button>
                </div>
            ))}
        </div>

    </>
}

export default Dashboard