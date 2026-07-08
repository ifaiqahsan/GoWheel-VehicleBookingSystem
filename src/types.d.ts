import { DefaultSession, DefaultUser } from "next-auth";
import { Types } from 'mongoose';
declare module "next-auth" {
  interface User extends DefaultUser {
    role: string;
  }

  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export type VehicleType = "all" | "bikes" | "cars" | "suvs" | "vans" | "prestige";

export interface IVehicle {
    _id: string;
    owner: string | Types.ObjectId;
    type: VehicleType;
    vehicleModel: string;
    number: string;
    imageUrl?: string;
    baseFare?: number;
    pricePerKM?: number;
    waitingCharge?: number;
    status: "approved" | "pending" | "rejected";
    rejectionReason?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export {};