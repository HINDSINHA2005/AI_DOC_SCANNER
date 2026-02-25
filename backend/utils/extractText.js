const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

async function extractText(filePath) {
  if (filePath.toLowerCase().endsWith(".pdf")) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  }

  if (filePath.toLowerCase().endsWith(".docx")) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  throw new Error("Unsupported file type");
}

module.exports = extractText;
