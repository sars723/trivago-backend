import express from "express"
import UserModel from './schema.js'

/* import { JWTAuthMiddleware } from "../../OAuth/token.js" */

const usersRouter = express.Router()

usersRouter.post("/register", async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body)
        const { _id } = await newUser.save()

        res.status(201).send({ _id })
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/", async (req, res, next) => {
    try {
        const users = await UserModel.find()
        res.send(users)
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/me", async (req, res, next) => {
    try {
        /*  res.send(req.user) */
    } catch (error) {
        next(error)
    }
})

usersRouter.put("/me", async (req, res, next) => {
    try {

        res.send()
    } catch (error) {
        next(error)
    }
})

usersRouter.delete("/", async (req, res, next) => {
    try {
        /*  await req.user.deleteOne() */
        res.send()
    } catch (error) {
        next(error)
    }
})
usersRouter.get("/:userId"/* , adminOnlyMiddleware */, async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        res.send(user)
    } catch (error) {
        next(error)
    }
})

usersRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.checkCredentials(email, password)

        if (user) {

            //generate an access token
        } else {

            //sending an error (401)
        }
    } catch (error) {
        next(error)
    }
})

export default usersRouter
