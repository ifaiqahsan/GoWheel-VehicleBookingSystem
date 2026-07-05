import mongoose from 'mongoose';

export type VehicleType = "all" | "bikes" | "cars" | "suvs" | "vans" | "prestige";

interface IVehicle extends mongoose.Document {
    owner: mongoose.Types.ObjectId;
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

const vehicleSchema = new mongoose.Schema<IVehicle>({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { 
        type: String, 
        required: true, 
        enum: ["all", "bikes", "cars", "suvs", "vans", "prestige"],
        lowercase: true
    },
    vehicleModel: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    baseFare: { type: Number },
    pricePerKM: { type: Number },
    waitingCharge: { type: Number },
    status: { 
        type: String, 
        default: "pending", 
        enum: ["approved", "pending", "rejected"] 
    },
    rejectionReason: { type: String },
    isActive: { type: Boolean, default: false }
}, { timestamps: true });

const Vehicle = mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", vehicleSchema);
export default Vehicle;