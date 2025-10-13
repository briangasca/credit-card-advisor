from pypdf import PdfReader
from dotenv import load_dotenv
import re
import json
from openai import OpenAI
import sys

load_dotenv()

pre_instructions = """You are a Credit Card Analyzer. The input is a JSON object with the following structure:
{
  "summary": {
    "new_balance": number,
    "credit_limit": number,
    "available_credit": number
  },
  "transactions": [
    {"date": "MM/DD", "merchant": string, "amount": number}
  ]
}

Analyze the user's spending habits and recommend the top 3 credit cards. Return your output strictly in JSON with this schema:

{
  "top_cards": [
    {
      "name": string,
      "best_for": string,  // e.g., "Dining and Food Delivery", "Retail/Online Purchases", "Groceries"
      "reasons": string    // 1–2 sentences explaining why this card fits their spending habits
    }
  ],
  "spending_summary": {
    "food_delivery": percentage,
    "retail_online": percentage,
    "groceries": percentage,
    "other": percentage
  }
}

- Do not include any PII.
- Only output valid JSON.
"""

client = OpenAI()

def read_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text.strip()

def extract_transactions(text):
    transaction_pattern = re.compile(r'(\d{2}/\d{2})\s+(.+?)\s+\$?([\d,]+\.\d{2})')

    transactions = []
    for match in transaction_pattern.finditer(text):
        date, merchant, amount = match.groups()
        amount = float(amount.replace(',', ''))
        transactions.append({
            "date": date,
            "merchant": merchant,
            "amount": amount
        })
    return transactions

def extract_account_summary(text):
    summary = {}
    new_balance_match = re.search(r'New Balance\D*([\d,]+\.\d{2})', text)
    credit_limit_match = re.search(r'Credit Access Line\D*([\d,]+\.\d+)', text)
    available_credit_match = re.search(r'Available Credit\D*([\d,]+\.\d+)', text)

    if new_balance_match:
        summary["new_balance"] = float(new_balance_match.group(1).replace(',', ''))
    if credit_limit_match:
        summary["credit_limit"] = float(credit_limit_match.group(1).replace(',', ''))
    if available_credit_match:
        summary["available_credit"] = float(available_credit_match.group(1).replace(',', ''))

    return summary

def pdf_to_clean_json(file_path):
    text = read_pdf(file_path)
    transactions = extract_transactions(text)
    summary = extract_account_summary(text)

    return {
        "transactions": transactions,
        "summary": summary
    }


def main(): 
    if len(sys.argv) < 2:
        print("Usage: python read_pdf.py <pdf_file>")
        sys.exit(1)

    pdf_path = sys.argv[1]
    content = pdf_to_clean_json(pdf_path)

    response = client.responses.create(
        model="gpt-4.1",
        instructions=pre_instructions,
        input=json.dumps(content),
        max_output_tokens=1000,
        temperature=0.3
    )
    print(response.output_text)

if __name__ == '__main__':
    main()