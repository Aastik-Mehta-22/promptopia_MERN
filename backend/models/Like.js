import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User ID is required"],
    },
    prompt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prompt",
        required: [true, "Prompt ID is required"],
    },
}, { timestamps: true });

export default mongoose.model("Like", LikeSchema); // it is stored in mongoDB as "likes" in mongoDB

