import { NextResponse, NextRequest } from "next/server";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    },
    region: 'ap-south-1',
})

export async function DELETE(req: NextRequest){
    const {path} = await req.json();

    const command  = new DeleteObjectCommand({
        Bucket: "vipuls3-bucket",
        Key: path
    })

    const response = await client.send(command);
    return NextResponse.json({
        response
    })
}