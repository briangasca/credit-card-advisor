import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    card: { type: mongoose.Schema.Types.ObjectId, ref: "CreditCard" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: Number,
    comment: String,
});

export default mongoose.model("Review", reviewSchema);