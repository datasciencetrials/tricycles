import pypdf
import argparse

def extract_pdf_text(filepath):
    reader = pypdf.PdfReader(filepath)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract text from PDF")
    parser.add_argument("--input", required=True, help="Input PDF file")
    parser.add_argument("--output", required=True, help="Output TXT file")
    args = parser.parse_args()

    try:
        proposal_text = extract_pdf_text(args.input)
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(proposal_text)
        print(f"Proposal text extracted to {args.output}")
    except Exception as e:
        print(f"Error: {e}")
