
import express from "express"
import AccomoModel from "./AccomoSchema.js"
import {JWTAuthMiddleware} from "../../OAuth/jwt-middle.js"
import { onlyHostAllowedRoute } from "../../OAuth/host_validation_middlew.js"
import createError from "http-errors"



const AccomoRouter = express.Router()







//you have to put the token validation middleware
//you need to put the host validation middleware
// and then from req.user you need to retrieve the user._id
AccomoRouter.post("/", JWTAuthMiddleware, onlyHostAllowedRoute,  async (req, res,next) => {
    try {
      // console.log('inside post accomoo', req.user)

      // for this one you need to merge the body (with the accomodation data)
      // and retrieve the user ID from req.user._id
      const userID = req.user._id
      console.log(req.user._id, 'just ID')
      // console.log(userId , 'USER ID')
      const mergedData = {
        ...req.body,
        host: userID
      }
      // console.log(mergedData, 'MERGED DATA')
      //and send this merged objt to the AccomoSchema
       const newAccomo= new AccomoModel(mergedData)

        const savedAccomo= await newAccomo.save()
        console.log(savedAccomo)
    
        res.status(201).send(savedAccomo)
      } catch (error) {
        next(createError(400, `Invalid Id: ${error}}!`))
      }
})

AccomoRouter.get("/", JWTAuthMiddleware, async (req, res,next) => {
    try {
        const accommodations = await AccomoModel.find().populate('host')
        res.send(accommodations)
      } catch (error) {
        next(error)
      }
})

// get single accommodation by ID
AccomoRouter.get("/:_id", JWTAuthMiddleware, async (req, res,next) => {
    try {
      const accommodations = await AccomoModel.findById(req.params._id)
        res.send(accommodations)
      } catch (error) {
        next(error)
      }
})


//just missing the match accommodation ID and host ID
AccomoRouter.put("/:_id", JWTAuthMiddleware, onlyHostAllowedRoute, async (req, res,next) => {
    
    try {
        const accomoId = req.params._id;
    
        //  AccomoModel.find by host Id and accommodation id
        // modify and save()
        const modifiedAccomo = await AccomoModel.findByIdAndUpdate(
            accomoId,
          req.body,
          {
            new: true, // returns the modified Accommodation
          }
        );
    
        if (modifiedAccomo) {
          res.status(204).send(modifiedAccomo);
        } else {
          next(createError(404, `Accommodation with id ${accomoId} does not exists!`));
        }
      } catch (error) {
        next(error);
      }
    
})

AccomoRouter.delete("/:id", JWTAuthMiddleware, onlyHostAllowedRoute, async (req, res,next) => {
    try {
        await req.accommodations.deleteOne()
        res.status(204).send()
      } catch (error) {
        next(createError(404, `Accommodation with id ${accomoId} does not exists!`))
      }
})

export default AccomoRouter