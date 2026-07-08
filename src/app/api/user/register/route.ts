import { NextResponse } from "next/server";
import connectDB from "@/core/db/db";
import User from "@/core/models/user.model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("Registration attempt for:", body.email); // Debug point 1

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      console.log("Registration failed: User already exists"); // Debug point 2
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("Attempting to save user to DB"); // Debug point 3
    await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role || "customer",
      isVerified: false,
      verificationCode,
    });

    console.log("Attempting to send email"); // Debug point 4
    await transporter.sendMail({
      from: `"GoWheel" <${process.env.EMAIL_USER}>`,
      to: body.email,
      subject: "Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    });

    return NextResponse.json({ message: "Verification code sent!" }, { status: 201 });
  } catch (error) {
    console.error("Registration error details:", error); // Critical: Shows why it catches
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}