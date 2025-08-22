import mongoose, { Schema, Document, model, models } from "mongoose";

const dbURL = process.env.DB_URL

interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userschema = new Schema<Iuser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    if (!dbURL) {
      throw new Error("Database URL is not defined");
    }

    await mongoose.connect(dbURL);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Connect to database
connectDB();

export const userModel = models.users || model<Iuser>("users", userschema);


