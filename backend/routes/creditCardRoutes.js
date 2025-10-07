import express from "express";
import CreditCard from "../models/CreditCard.js";

const router = express.Router();

//Add new credit card
router.post('/', async (req, res) => {
    try {
        const card = new CreditCard(req.body);
        await card.save();
        res.status(201).json(card);
    } catch(e){
        res.status(500).json({error: e.message});
    }
})

export default router