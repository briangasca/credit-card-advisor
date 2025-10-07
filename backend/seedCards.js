import mongoose from "mongoose";
import CreditCard from "./models/CreditCard.js";
import dotenv from "dotenv";

dotenv.config();

const cards = [
  {
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    annualFee: 95,
    rewards: [
      { category: "Travel", rate: "2x", portal: "Chase Travel" },
      { category: "Dining", rate: "3x" },
      { category: "All Other Purchases", rate: "1x" },
    ],
    signupBonus: {
      bonus: "75,000 points",
      requirement: "after spending $4,000 in 3 months",
    },
    notes: "Best for travelers who want flexible Ultimate Rewards points.",
  },
  {
    name: "Chase Sapphire Reserve",
    issuer: "Chase",
    annualFee: 550,
    rewards: [
      { category: "Travel", rate: "3x", portal: "Chase Travel" },
      { category: "Dining", rate: "3x" },
      { category: "All Other Purchases", rate: "1x" },
    ],
    annualCredits: [
      { description: "Travel Credit", amount: 300 },
    ],
    signupBonus: {
      bonus: "75,000 points",
      requirement: "after spending $4,000 in 3 months",
    },
    notes: "Premium travel card with lounge access and strong travel protections.",
  },
  {
    name: "Capital One Venture X",
    issuer: "Capital One",
    annualFee: 395,
    rewards: [
      { category: "All Purchases", rate: "2x" },
      { category: "Hotels & Flights", rate: "10x", portal: "Capital One Travel" },
      { category: "Rental Cars", rate: "5x", portal: "Capital One Travel" },
    ],
    annualCredits: [
      { description: "Travel Credit", amount: 300 },
    ],
    signupBonus: {
      bonus: "75,000 miles",
      requirement: "after spending $4,000 in 3 months",
    },
    notes: "High-end card offering travel portal bonuses and lounge access.",
  },
  {
    name: "American Express Gold",
    issuer: "American Express",
    annualFee: 250,
    rewards: [
      { category: "Dining", rate: "4x" },
      { category: "Groceries", rate: "4x" },
      { category: "Flights", rate: "3x" },
      { category: "All Other Purchases", rate: "1x" },
    ],
    annualCredits: [
      { description: "Dining Credit", amount: 120 },
      { description: "Uber Cash", amount: 120 },
    ],
    signupBonus: {
      bonus: "60,000 Membership Rewards points",
      requirement: "after spending $4,000 in 6 months",
    },
    notes: "Excellent for dining and grocery rewards; mid-tier travel benefits.",
  },
  {
    name: "Citi Double Cash",
    issuer: "Citi",
    annualFee: 0,
    rewards: [
      { category: "All Purchases", rate: "2%" },
    ],
    notes: "Simple flat-rate cash back card; great for general spending.",
  },
  {
    name: "Discover it Cash Back",
    issuer: "Discover",
    annualFee: 0,
    rewards: [
      { category: "Rotating Categories", rate: "5%" },
      { category: "All Other Purchases", rate: "1%" },
    ],
    signupBonus: {
      bonus: "Cashback Match",
      requirement: "Discover matches all cash back earned your first year",
    },
    notes: "Great starter card with rotating 5% categories and first-year match.",
  },
  {
    name: "Wells Fargo Autograph",
    issuer: "Wells Fargo",
    annualFee: 0,
    rewards: [
      { category: "Travel", rate: "3x" },
      { category: "Dining", rate: "3x" },
      { category: "Gas", rate: "3x" },
      { category: "All Other Purchases", rate: "1x" },
    ],
    signupBonus: {
      bonus: "20,000 points",
      requirement: "after spending $1,000 in 3 months",
    },
    notes: "Strong no-fee rewards card with broad 3x categories.",
  },
  {
    name: "Bank of America Customized Cash Rewards",
    issuer: "Bank of America",
    annualFee: 0,
    rewards: [
      { category: "Choice Category", rate: "3%" },
      { category: "Groceries & Wholesale Clubs", rate: "2%" },
      { category: "All Other Purchases", rate: "1%" },
    ],
    notes: "Customizable 3% category; higher rewards for Preferred Rewards members.",
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await CreditCard.deleteMany({});
    await CreditCard.insertMany(cards);
    console.log("Credit cards seeded successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding cards", err);
    process.exit(1);
  });
