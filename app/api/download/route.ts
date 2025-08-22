import { NextRequest, NextResponse } from "next/server";
import {S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3'
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

        const body = await req.json();
        const prefix = body.prefix;

        if (!prefix) {
            return NextResponse.json({ error: "Missing prefix" }, { status: 400 });
        }

        const command = new GetObjectCommand({
            Bucket:"vipuls3-bucket",
            Key: `${prefix}`
        })

        const url = await getSignedUrl(client, command, { expiresIn:5 });

        return NextResponse.json({"url":url});
    } catch (error) {
        console.error("Error in download route:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}