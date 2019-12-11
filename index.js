const express = require("express")
const helmet = require("helmet")
const logger = require("./middleware/logger")
const landingRouter = require("./routers/landing")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express()

server.use(helmet())
server.use(logger())
server.use(express.json())

server.use("/", landingRouter)
server.use("/api/user", userRouter)
server.use("/api/user/:id", postRouter)

server.use((req, res) => {
    res.status(404).json({ message: "Route was not found" })
})

server.use((err, req, res, next) => {
    res.status(500).json({ message: "An internal error occured, please try again later"})
})

server.listen(8080, () => {
    console.log("\n*** Server runnning on http://localhost:8080 ***\n")
})