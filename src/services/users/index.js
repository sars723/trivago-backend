import express from "express"
import UserModel from './schema.js'
import { onlyHostAllowedRoute } from '../../OAuth/host_validation_middlew.js'
import { generatePairOfTokens } from '../../OAuth/jwt-aux.js'
import { JWTAuthMiddleware } from "../../OAuth/jwt-middle.js"
import createHttpError from "http-errors"

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
usersRouter.get("/:userId"/* , hostOnlyMiddleware */, async (req, res, next) => {
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
        console.log(user)
        if (user) {

            //generate an access token
            const { accessToken, refreshToken } = await generatePairOfTokens(user)

            res.send({ accessToken, refreshToken })
        } else {

            //sending an error (401)
            next(createHttpError(401, "Credentials are not ok!"))
        }
    } catch (error) {
        next(error)
    }
})



export default usersRouter
