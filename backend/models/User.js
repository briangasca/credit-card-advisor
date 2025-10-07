import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    creditLevel: {type: String, enum: ['new', 'middle', 'experienced']},
    spendingHabits: [
        {
            category: String, 
            monthlySpend: Number
        }
    ]
});

export default mongoose.model("User", userSchema);