import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
    try {
        const { email, code } = await req.json();

        if (!email || !code) {
            return NextResponse.json(
                { message: "Email and verification code are required." },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User account not found." },
                { status: 404 }
            );
        }

        if (user.verificationCode !== code) {
            return NextResponse.json(
                { message: "Invalid verification code." },
                { status: 400 }
            );
        }

        await User.updateOne(
            { email },
            { 
                $set: { isVerified: true },
                $unset: { verificationCode: "" }
            }
        );

        return NextResponse.json(
            { message: "Email verified successfully! You can now log in." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}