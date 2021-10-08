import createHttpError from "http-errors"
import { verifyJWT } from "./jwt-aux.js"
import UserModel from "../services/users/schema.js"

export const JWTAuthMiddleware = async (req, res, next) => {

  if (!req.headers.authorization) {
    next(createHttpError(401, "Please provide credentials in Authorization header!"))
  } else {
    try {

      const token = req.headers.authorization.replace("Bearer ", "")
      console.log("token", token)

      const decodedToken = await verifyJWT(token)
      console.log(decodedToken, 'decoded token')

      const user = await UserModel.findById(decodedToken._id)


      if (user) {
        // user
        req.user = user

        next()
      } else {
        next(createHttpError(404, "User not found!"))
      }
    } catch (error) {
      next(createHttpError(401, "Token not valid!"))
    }
  }
}