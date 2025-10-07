import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true},
    password: String //hash later
});

export default mongoose.model("User", userSchema);