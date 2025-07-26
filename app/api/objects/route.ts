// is route pe hum saari files/ objects ko showcase karenge
import { NextRequest, NextResponse } from "next/server";
import {S3Client, ListObjectsV2Command, PutObjectCommand} from '@aws-sdk/client-s3'
import { auth } from "@clerk/nextjs/server";
import { userModel } from "@/lib/db";

const client = new S3Client({
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: 'ap-south-1',
})

// export async function GET(request: NextRequest){

//     const command = new ListObjectsV2Command({
//         Bucket: 'vipuls3-bucket',
//         Delimiter: '/',
//         Prefix: 'user-ironman/'
//     });
//     const result = await client.send(command)
//     console.log(result)
//     let folders = result.CommonPrefixes;
//     // console.log(folders)
//     let folderlist = folders?.map((e)=>{
//         return e.Prefix;
//     })
//     // console.log(newfolders);
//     let files = result.Contents;
//     let fileslist = files?.map((e)=>{
//         return e.Key;
//     })
//     // console.log(newfiles);
    
//     return NextResponse.json({
//         "folders": {folderlist},
//         "files": {fileslist}
//     })
// }

export async function GET(request: NextRequest) {
    const { userId } = await auth();
    //check if the user is present in the database or not
    const userPresent = await userModel.findOne({ userid: userId });
    if(!userPresent){
        //make an entry in the database
        userModel.create({
            "userid": userId,
        })
        //create a folder of the name as userId
        const command = new PutObjectCommand({
            Bucket: "vipuls3-bucket",
            Key: `${userId}/`,
            Body: '',
        })

        await client.send(command)
    }
    //set the prefix and send the response
    const command = new ListObjectsV2Command({
        Bucket: "vipuls3-bucket",
        Delimiter: '/',
        Prefix: `${userId}/`,
    })

    const result = await client.send(command);
    let folders = result.CommonPrefixes;
    // console.log(folders)
    let folderlist = folders?.map((e)=>{
        return e.Prefix;
    })
    // console.log(newfolders);
    let files = result.Contents?.map((e)=>{
        return e.Key;
    })

    // console.log(newfiles);
    return NextResponse.json({
        userId,
        folderlist,
        files,
    })
}

