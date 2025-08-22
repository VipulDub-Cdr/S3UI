import { NextResponse, NextRequest } from "next/server";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getAuthenticatedUser, createAuthError } from "@/lib/middleware";

const client = new S3Client({
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    },
    region: 'ap-south-1',
})

export async function DELETE(req: NextRequest){
    try {
        // Check authentication
        const authUser = await getAuthenticatedUser(req);
        if (!authUser) {
            return createAuthError();
        }

        const {path} = await req.json();

        if (!path) {
            return NextResponse.json({ error: "Missing path" }, { status: 400 });
        }

        const command  = new DeleteObjectCommand({
            Bucket: "vipuls3-bucket",
            Key: path
        })

        const response = await client.send(command);
        return NextResponse.json({
            success: true,
            response
        })
    } catch (error) {
        console.error("Error in delete route:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}