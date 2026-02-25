const extractText = require("../utils/extractText");

let documentText = "";

exports.uploadFile = async (req, res) => {
  try {
    const filePath = req.file.path;

    const text = await extractText(filePath);

    documentText = text;   // store full text

    res.json({ message: "File processed successfully" });

  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getDocumentText = () => documentText;
