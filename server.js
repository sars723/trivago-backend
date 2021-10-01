import express from "express"
import cors from "cors"
// import blogPostRouter from "./src/services/blogPost/index.js" -<<<< for accommodation please use the same exact line
// import usersRouter from "./src/services/user/index.js" -<<<< for user routes same exact line
import lib from "./src/library/index.js"
import mongoose from 'mongoose'
// import passport from "passport"
// import { googleStrategy } from "./src/auth/Oauth/strategy-config.js"

const {errorHandlers, serverConfig} = lib



const server = express()
const { PORT } = process.env

// passport.use('google', googleStrategy)

server.use(express.json())
server.use(cors(serverConfig))
// server.use(passport.initialize())

// server.use("/blogPost", blogPostRouter) rename and use for accommodation same exact line
// server.use("/user", usersRouter) //use for user same exact line



server.use(errorHandlers.forbidden)
server.use(errorHandlers.notFound)
server.use(errorHandlers.badRequest)
server.use(errorHandlers.unauthorizedHandler)
server.use(errorHandlers.server)




mongoose.connect(process.env.MONGO_CONN)


mongoose.connection.on('connected', ()=> {
  console.log('Mongo connected')
  server.listen(PORT, async () => {
    console.log("🚀 Server is running on port ", PORT)
  })

  mongoose.connection.on('error', error =>{
    console.log('Mongo error: ', error)
  })


  
  server.on("error", (error) =>
    console.log("🚀 Server is crashed due to ", error)
  )
})


