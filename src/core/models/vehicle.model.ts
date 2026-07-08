import mongoose from 'mongoose';

export type VehicleType = "all" | "bikes" | "cars" | "suvs" | "vans" | "prestige";

interface IVehicle extends mongoose.Document {
    owner: mongoose.Types.ObjectId;
    type: VehicleType;
    vehicleModel: string;
    number: string;
    imageUrl?: string;
    gallery?: string[]; // Added for gallery support
    description?: string; // Added for detailed view
    specs?: Record<string, string>; // Added for dynamic spec grid
    features?: string[]; // Added for checkmark features
    price: number; // Changed from baseFare to generic price
    status: "approved" | "pending" | "rejected";
    isActive: boolean;
}

const vehicleSchema = new mongoose.Schema<IVehicle>({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ["all", "bikes", "cars", "suvs", "vans", "prestige"], lowercase: true },
    vehicleModel: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    gallery: { type: [String], default: [] },
    description: { type: String },
    specs: { type: Map, of: String }, // Flexible structure for dynamic data
    features: { type: [String], default: [] },
    price: { type: Number, required: true }, // Unified price field
    status: { type: String, default: "pending", enum: ["approved", "pending", "rejected"] },
    isActive: { type: Boolean, default: false }
}, { timestamps: true });

const Vehicle = mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", vehicleSchema);
export default Vehicle;