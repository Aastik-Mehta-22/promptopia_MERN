import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            required: [true, "Heading is required"],
            trim: true, // Removes leading and trailing whitespaces
            maxlength: [100, "Heading cannot exceed 100 characters"],
        },
        definition: {
            type: String,
            required: [true, "Definition is required"],
            trim: true,
            maxlength: [1000, "Definition cannot exceed 1000 characters"],
        },
        likeCount: {
            type: Number,
            default: 0,
            min: [0, "Like count cannot be negative"],
        },
        createdBy: {
            type: String,
            required: [true, "User ID is required"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },

    }
);

export default mongoose.model("Prompt", PromptSchema); // it is stored in mongoDB as "prompts"
