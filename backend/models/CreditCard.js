import mongoose from "mongoose";

const creditCardSchema = mongoose.Schema({
    name: String,
    issuer: String,
    annualFee: Number,
    rewards: [
        {
            category: String, //Groceries, travel
            rate: String, //4x, 2%
            portal: {type: String, default: null}
        }
    ],
    annualCredits: [
        {
            description: String, //travel credit
            amount: Number //$300
        }
    ],
    signupBonus: {
        bonus: String, //e.g 75k points
        requirement: String //e.g after spending $4k
    },
    notes: String
})

export default mongoose.model("CreditCard", creditCardSchema);