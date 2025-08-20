import mongoose, { Schema, Document, model, models } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import {useUser} from '@clerk/nextjs'

const dbURL = process.env.DB_URL

interface Iuser extends Document {
  userid: string;
}

const userschema = new Schema<Iuser>({
  userid: { type: String, required: true },
});

async function connectDB() {
    await mongoose.connect(dbURL!);
}

connectDB();

export const userModel = models.users || model<Iuser>("users", userschema);


