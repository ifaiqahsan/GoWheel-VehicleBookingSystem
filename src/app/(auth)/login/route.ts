import { NextResponse } from "next/server";
import connectDB from "@/core/db/db";
import User from "@/core/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    const user = await User.findOne({ 
      $or: [{ name: username }, { email: username }] 
    });

    if (!user || !user.isVerified) {
      return NextResponse.json({ message: "Invalid credentials or unverified account." }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful!",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}