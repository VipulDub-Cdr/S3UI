import mongoose, { Schema, Document, model, models } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import {useUser} from '@clerk/nextjs'

interface Iuser extends Document {
  userid: string;
}

const userschema = new Schema<Iuser>({
  userid: { type: String, required: true },
});

async function connectDB() {
    await mongoose.connect("mongodb://localhost:27017/mydb");
}

connectDB();

export const userModel = models.users || model<Iuser>("users", userschema);


