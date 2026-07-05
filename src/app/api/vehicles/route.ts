import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/core/db/db";
import Vehicle from "@/core/models/vehicle.model";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const query: any = {};
    if (type && type !== "all") query.type = type;
    if (status) query.status = status;

    const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });
    return NextResponse.json(vehicles, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch vehicles", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const newVehicle = await Vehicle.create(body);
    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to register vehicle", details: error.message },
      { status: 400 }
    );
  }
}