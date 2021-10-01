//folder to create the endpoints and handlers

import express from "express"

const AccomoRouter = express.Router()

AccomoRouter.post("/accommodation", async (req, res,next) => {
    try {
        const newUser = new UserModel(req.body)
        const { _id } = await newUser.save()
    
        res.status(201).send({ _id })
      } catch (error) {
        next(error)
      }
})

AccomoRouter.get("/", async (req, res,next) => {
    try {
        const users = await UserModel.find()
        res.send(users)
      } catch (error) {
        next(error)
      }
})

AccomoRouter.get("/:id", async (req, res,next) => {
    try {
        res.send(req.user)
      } catch (error) {
        next(error)
      }
})

AccomoRouter.put("/:id", async (req, res,next) => {
    try {
        req.user.name = "John"
    
        await req.user.save()
        res.send()
      } catch (error) {
        next(error)
      }
})

AccomoRouter.delete("/:id", async (req, res,next) => {
    try {
        await req.user.deleteOne()
        res.send()
      } catch (error) {
        next(error)
      }
})

export default AccomoRouter