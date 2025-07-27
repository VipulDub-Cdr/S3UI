"use client"
import * as React from 'react'

const Dashboard: React.FC = () => {
    const [files, setfiles] = React.useState<any[]>([])
    const [folders, setfolders] = React.useState<any[]>([])
    const [path, setpath] = React.useState<String>("Loading...");
    const [prevpath, setprevpath] = React.useState<String>("");

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
        console.log(localprevPath)
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
    }, [])

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
        setfolders(data.folderlist)
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


    return <>
        <div>
            <button type="button" onClick={()=>fetchOnClick(getPreviousPath(path))}>Go Back</button>
        </div>
        <div className="border-2 mx-3 py-2 px-1">
            <h1 className="font-bold">Path: </h1>
            {path}
        </div>

        <div className="border-2 mx-3 py-2 px-1 my-2">
            {files?.length > 0 && <h1 className="font-bold">Files:</h1>}
            {(files ?? []).map((item: string, index: number) => (
                <div className='flex justfiy-start gap-6'>
                    <div key={index}>
                        <i>{item}</i>
                    </div>
                    
                </div>
            ))}

            {folders?.length > 0 && <h1 className="font-bold">Folders:</h1>}
            {(folders ?? []).map((item: string, index: number) => (
                <div key={index}>
                    <button onClick={() => fetchOnClick(item)}>{item}</button>
                </div>
            ))}
        </div>

    </>
}

export default Dashboard