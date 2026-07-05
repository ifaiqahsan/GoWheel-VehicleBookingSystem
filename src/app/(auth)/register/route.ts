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
    const { name, email, password, role } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
      isVerified: false,
      verificationCode,
    });

    await transporter.sendMail({
      from: `"GoWheel" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    });

    return NextResponse.json({ message: "Verification code sent!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}