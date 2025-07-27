import { NextResponse, NextRequest } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
const client = new S3Client({
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: 'ap-south-1',
})

export async function POST(req: NextRequest){
    const body = await req.json();
    const prefix = body.prefix;
    console.log(prefix)
    const command = new ListObjectsCommand({
        Bucket: "vipuls3-bucket",
        Delimiter: '/',
        Prefix: `${prefix}`
    })

    const result = await client.send(command);
    console.log(result);
    const contentList = result.Contents;
    const commonPrefixesList = result.CommonPrefixes

    const folderlist = commonPrefixesList?.map((e)=>{
        return e.Prefix
    })
    console.log(folderlist)
    const files = contentList?.map((e)=>{
        return e.Key
    })
    console.log(files)
    return NextResponse.json({
        folderlist,
        files,
    })

}