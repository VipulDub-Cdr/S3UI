import { NextResponse, NextRequest } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    },
    region: 'ap-south-1',
})

export async function POST(req:NextRequest){
    const {fileName, fileType, path} = await req.json();
    const completePath = path.endsWith("/") ? path + fileName : path + "/" + fileName;
    // console.log(completePath);
    const command = new PutObjectCommand({
        Bucket:"vipuls3-bucket",
        Key:completePath,
        ContentType:fileType,
    })

    const uploadURl = await getSignedUrl(client, command, {expiresIn:60});

    return NextResponse.json({uploadURl})
}