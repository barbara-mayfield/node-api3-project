const express = require("express")
const helmet = require("helmet")
const logger = require("./middleware/logger")
const serverRouter = require("./server")
const userRouter = require("./users/userRouter")

const server = express()

server.use(helmet())
server.use(logger)
server.use(express.json())

server.use("/", serverRouter)
server.use("/api/users", userRouter)

server.use((req, res) => {
    res.status(404).json({ message: "Route was not found" })
})

server.use((err, req, res, next) => {
    res.status(500).json({ message: "An internal error occured, please try again later"})
})

server.listen(8081, () => {
    console.log("\n*** Server runnning on http://localhost:8081 ***\n")
})