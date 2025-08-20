import { NextRequest, NextResponse } from "next/server";
import {S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { auth } from "@clerk/nextjs/server";

const client = new S3Client({
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    },
    region: 'ap-south-1',
})

export async function POST(req:NextRequest){
    const body = await req.json();
    const prefix = body.prefix;

    const command = new GetObjectCommand({
        Bucket:"vipuls3-bucket",
        Key: `${prefix}`
    })

    const url = await getSignedUrl(client, command, { expiresIn:5 });

    // console.log(url)

    return NextResponse.json({"url":url});
}