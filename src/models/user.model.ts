import mongoose, { Mongoose } from 'mongoose';

interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password?: string;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
    isVerified: boolean;
    verificationCode?: string;
}
const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
