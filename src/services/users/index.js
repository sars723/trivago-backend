import express from "express"
import UserModel from './schema.js'
import { onlyHostAllowedRoute } from '../../OAuth/host_validation_middlew.js'
import { generatePairOfTokens } from '../../OAuth/jwt-aux.js'
import { JWTAuthMiddleware } from "../../OAuth/jwt-middle.js"
import createHttpError from "http-errors"
import { usersValidationMiddleware } from "./validation.js"
import { validationResult } from "express-validator"

const usersRouter = express.Router()


usersRouter.get("/me/accomodation",  JWTAuthMiddleware, onlyHostAllowedRoute, async(req, res, next) => {

    try{
        if(req.user.role === "host"){
            const retrievedAccomodations = await UserModel.find({}).populate('user',req.user)

        if(retrievedAccomodations){
            res.send(retrievedAccomodations)
        }}else{
            next(createHttpError(403, "User Unauthorized"))
        }
        }catch(err){
            next(createHttpError(500,"Somethings not right bro"))
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

            res.status(201).send({ _id })
        }

    } catch (error) {
        next(error)
    }
})

usersRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
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


/* usersRouter.get("/me", JWTAuthMiddleware, onlyHostAllowedRoute, async (req, res, next) => {

    try {
        const user = await UserModel.findById(req.params.userId)
        if (user) {
            res.send(user)
        }
        else {
            next(createHttpError(404, "user not found"))
        }
    } catch (error) {
        next(error)
    }
}) */

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
