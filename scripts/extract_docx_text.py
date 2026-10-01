import docx
import argparse

def get_text(filename):
    doc = docx.Document(filename)
    fullText = []
    for para in doc.paragraphs:
        fullText.append(para.text)
    return '\n'.join(fullText)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract text from DOCX")
    parser.add_argument("--input", required=True, help="Input DOCX file")
    parser.add_argument("--output", required=True, help="Output TXT file")
    args = parser.parse_args()

    try:
        text = get_text(args.input)
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Text extracted to {args.output}")
    except Exception as e:
        print(f"Error: {e}")
