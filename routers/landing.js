const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.send("<h3>Welcome to the Node-Api3-Project API</h3>")
})

router.get("/api", (req, res) => {
    res.json({ message: "Welcome to the User API" })
})

module.exports = router;