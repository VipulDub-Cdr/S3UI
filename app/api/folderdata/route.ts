import { NextResponse, NextRequest } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { getAuthenticatedUser, createAuthError } from "@/lib/middleware";

const client = new S3Client({
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    },
    region: 'ap-south-1',
})

export async function POST(req: NextRequest){
    try {
        // Check authentication
        const authUser = await getAuthenticatedUser(req);
        if (!authUser) {
            return createAuthError();
        }

        const body = await req.json();
        const prefix = body.prefix;

        if (!prefix) {
            return NextResponse.json({ error: "Missing prefix" }, { status: 400 });
        }

        const command = new ListObjectsCommand({
            Bucket: "vipuls3-bucket",
            Delimiter: '/',
            Prefix: `${prefix}`
        })

        const result = await client.send(command);
        const contentList = result.Contents;
        const commonPrefixesList = result.CommonPrefixes

        const folderlist = commonPrefixesList?.map((e)=>{
            return e.Prefix
        }) || []

        const files = contentList?.map((e)=>{
            return e.Key
        }) || []

        return NextResponse.json({
            folderlist,
            files,
        })
    } catch (error) {
        console.error("Error in folderdata route:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}