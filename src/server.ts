import express from "express"
import cors from "cors"
import AccomoRouter from "./services/accommodation/AccomoIndex.js" //-<<<< for accommodation please use the same exact line
import usersRouter from "./services/users/index.js" // for user routes same exact line
import lib from "./library/index.js"
import mongoose from 'mongoose'
import listEndpoints from "express-list-endpoints"
import passport from "passport"
import { facebookStrategy } from "./OAuth/OAuth_Strategies/strategy-config.js"

const { errorHandlers, serverConfig } = lib

process.env.TS_NODE_DEV && require("dotenv").config()

const server = express()
const { PORT } = process.env

passport.use('facebook', facebookStrategy)

server.use(express.json())
server.use(cors(/* serverConfig */))
server.use(passport.initialize())

server.use("/accommodation", AccomoRouter)// rename and use for accommodation same exact line
server.use("/users", usersRouter) //use for user same exact line



server.use(errorHandlers.forbidden)
server.use(errorHandlers.notFound)
server.use(errorHandlers.badRequest)
server.use(errorHandlers.unauthorizedHandler)
server.use(errorHandlers.server)


if (!process.env.MONGO_CONN) {
  throw new Error("NO Mongo url defined")
}

mongoose.connect(process.env.MONGO_CONN)


mongoose.connection.on('connected', () => {
  console.log('Mongo connected')
  server.listen(PORT, async () => {
    console.log("🚀 Server is running on port ", PORT)
  })





  mongoose.connection.on('error', error => {
    console.log('Mongo error: ', error)
  })



  server.on("error", (error) =>
    console.log("🚀 Server is crashed due to ", error)
  )
})


