import express from 'express'
import cors from 'cors';
import { connectDB } from './config/db.js'

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("API is running!")
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectDB();
        console.log("DB Connected")
        app.listen(PORT, () => {
            console.log("Server started at http://localhost:4000 ")
        });
    } catch(e) {
        console.error("Failed to connect to db", e)
        process.exit(1)
    }
}

startServer();


