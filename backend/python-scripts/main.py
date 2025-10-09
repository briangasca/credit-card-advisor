from pypdf import PdfReader
import sys

def read_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text.strip()

def main():
    if len(sys.argv) < 2:
        print("Usage: python read_pdf.py <pdf_file>")
        sys.exit(1)

    pdf_path = sys.argv[1]
    content = read_pdf(pdf_path)
    print(content)

if __name__ == '__main__':
    main()