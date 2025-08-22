// is route pe hum saari files/ objects ko showcase karenge
import { NextResponse, NextRequest } from "next/server";
import {S3Client, ListObjectsV2Command, PutObjectCommand} from '@aws-sdk/client-s3'
import { getAuthenticatedUser, createAuthError } from "@/lib/middleware";
import { userModel } from "@/lib/db";

const client = new S3Client({
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    },
    region: 'ap-south-1',
})

export async function GET(request: NextRequest) {
    try {
        // Check authentication
        const authUser = await getAuthenticatedUser(request);
        if (!authUser) {
            return createAuthError();
        }

        const userId = authUser.userId;

        //check if the user is present in the database or not
        const userPresent = await userModel.findById(userId);
        if(!userPresent){
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        //set the prefix and send the response
        const command = new ListObjectsV2Command({
            Bucket: "vipuls3-bucket",
            Delimiter: '/',
            Prefix: `${userId}/`,
        })

        const result = await client.send(command);
        const folders = result.CommonPrefixes;
        const folderlist = folders?.map((e)=>{
            return e.Prefix;
        }) || []
        
        const files = result.Contents?.map((e)=>{
            return e.Key;
        }) || []

        return NextResponse.json({
            userId,
            folderlist,
            files,
        })
    } catch (error) {
        console.error("Error in objects route:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

