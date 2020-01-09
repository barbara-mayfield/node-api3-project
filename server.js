const express = require("express")

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the node-api3-project API" })
})

module.exports = router;
