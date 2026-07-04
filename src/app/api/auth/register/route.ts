import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        await connectDB();

        let user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { message: "Email already exists." },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters long." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json(
            { message: "User registered successfully." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error registering user:", error);

        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}