import express from "express"
import UserModel from './schema.js'
import { onlyHostAllowedRoute } from '../../OAuth/host_validation_middlew.js'
import { generatePairOfTokens } from '../../OAuth/jwt-aux.js'
import { JWTAuthMiddleware } from "../../OAuth/jwt-middle.js"
import createHttpError from "http-errors"
import passport from "passport"
import { usersValidationMiddleware } from "./validation.js"
import { validationResult } from "express-validator"
import AccomoModel from "../accommodation/AccomoSchema.js"


const usersRouter = express.Router()


usersRouter.get("/me/accommodation", JWTAuthMiddleware, onlyHostAllowedRoute, async (req, res, next) => {
    try {
        const retrievedAccommodations = await AccomoModel.find({ host: req.user._id })
        res.send(retrievedAccommodations)
    } catch (err) {
        next(err)
    }
})



usersRouter.post("/register", usersValidationMiddleware, async (req, res, next) => {

    try {
        const errorsList = validationResult(req)

        if (!errorsList.isEmpty()) {

            next(createHttpError(400, { errorsList }))
        } else {
            const newUser = new UserModel(req.body)

            const { _id } = await newUser.save()

            const { accessToken, refreshToken } = await generatePairOfTokens(newUser)

            res.status(201).send({ accessToken, refreshToken })
        }

    } catch (error) {
        next(error)
    }
})

//return all the users for us to have a list of users
usersRouter.get("/", async (req, res, next) => {
    try {
        const users = await UserModel.find()
        res.send(users)
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
    try {
        res.send(req.user)
    } catch (error) {
        next(error)
    }
})

usersRouter.put("/me", JWTAuthMiddleware, async (req, res, next) => {
    try {
        const userID = req.user._id
        console.log(userID)
        const updatedUser = await UserModel.findByIdAndUpdate(userID, req.body, {
            new: true
        })
        if (updatedUser) {
            res.send(updatedUser)
        }
        else {
            res.status(404).send("not found")
        }

    } catch (error) {
        next(error)
    }
})

usersRouter.delete("/me", JWTAuthMiddleware, async (req, res, next) => {
    try {
        await req.user.deleteOne()

        res.send("deleted")
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
            next(createHttpError(401, "Credentials are not ok!"))
        }
    } catch (error) {
        next(error)
    }
})

usersRouter.get('/facebookLogin', passport.authenticate('facebook', { scope: ['email'] }))

usersRouter.get('/facebookRedirect', passport.authenticate('facebook'),
    (req, res, next) => {
        try {
            console.log(req.user)
            res.redirect(`http://localhost:3000/?accessToken=${req.user.tokens.accessToken}&refreshToken=${req.user.tokens.refreshToken}`)
        } catch (error) {
            next(error)
        }

    })

export default usersRouter
