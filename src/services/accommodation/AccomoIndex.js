
import express from "express"
import AccomoModel from "./AccomoSchema.js"
import {JWTAuthMiddleware} from "../../OAuth/jwt-middle.js"


const AccomoRouter = express.Router()




AccomoRouter.get("/user/me/accomodation", JWTAuthMiddleware, (req, res, next) => {
    
})


AccomoRouter.post("/", async (req, res,next) => {
    try {
        const newAccomo= new AccomoModel(req.body)
        const { _id } = await newAccomo.save()
    
        res.status(201).send({ _id })
      } catch (error) {
        next(error)
      }
})

AccomoRouter.get("/", async (req, res,next) => {
    try {
        const accomodations = await AccomoModel.find()
        res.send(accomodations)
      } catch (error) {
        next(error)
      }
})

AccomoRouter.get("/:id", async (req, res,next) => {
    try {
        res.send(req.accomodations)
      } catch (error) {
        next(error)
      }
})

AccomoRouter.put("/:id", async (req, res,next) => {
    // try {
    //     req.user.name = "John"
    
    //     await req.user.save()
    //     res.send()
    //   } catch (error) {
    //     next(error)
    //   }

    try {
        const accomoId = req.params.id;
    
        const modifiedAccomo = await AccomoModel.findByIdAndUpdate(
            accomoId,
          req.body,
          {
            new: true, // returns the modified Accommodation
          }
        );
    
        if (modifiedAccomo) {
          res.send(modifiedAccomo);
        } else {
          next(createError(404, `Accommodation with id ${accomoId} not found!`));
        }
      } catch (error) {
        next(error);
      }
    
})

AccomoRouter.delete("/:id", async (req, res,next) => {
    try {
        await req.accomodations.deleteOne()
        res.send()
      } catch (error) {
        next(error)
      }
})

export default AccomoRouter