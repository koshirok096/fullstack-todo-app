import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        bgwallpaper: {
            type: String,
            required: true,
            default: 'https://images.unsplash.com/photo-1581590212320-a1f693559160?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        },
        // profilePicture: { type: String },
    },
        { timestamps: true }
);

export default mongoose.model("User", UserSchema);