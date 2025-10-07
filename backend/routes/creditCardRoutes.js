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

//Get all cards
router.get('/', async (req, res) => {
    try {
        const cards = await CreditCard.find();
        res.json(cards);
    } catch(e){
        res.status(500).json({error: e.message})
    }
})

//Get specific card
router.get('/:id', async (req, res) => {
    try {
        const card = await CreditCard.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
          }
        res.json(card);
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})

export default router