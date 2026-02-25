const router = require("express").Router();
const { askQuestion } = require("../controllers/chatController");

router.post("/", askQuestion);

module.exports = router;
