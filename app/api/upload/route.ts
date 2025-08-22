import { NextResponse, NextRequest } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getAuthenticatedUser, createAuthError } from "@/lib/middleware";

const client = new S3Client({
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    },
    region: 'ap-south-1',
})

export async function POST(req:NextRequest){
    try {
        // Check authentication
        const authUser = await getAuthenticatedUser(req);
        if (!authUser) {
            return createAuthError();
        }

        const {fileName, fileType, path} = await req.json();
        
        if (!fileName || !fileType || !path) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const completePath = path.endsWith("/") ? path + fileName : path + "/" + fileName;
        
        const command = new PutObjectCommand({
            Bucket:"vipuls3-bucket",
            Key:completePath,
            ContentType:fileType,
        })

        const uploadURl = await getSignedUrl(client, command, {expiresIn:60});

        return NextResponse.json({uploadURl})
    } catch (error) {
        console.error("Error in upload route:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}