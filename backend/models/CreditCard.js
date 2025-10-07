import mongoose from "mongoose";

const creditCardSchema = mongoose.Schema({
    name: String,
    issuer: String,
    annualFee: Number,
    rewards: [
        {
            category: String, //Groceries, travel
            rate: String //4x, 2%
        }
    ]
})

export default mongoose.model("CreditCard", creditCardSchema);