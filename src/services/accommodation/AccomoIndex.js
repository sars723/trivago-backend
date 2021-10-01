//folder to create the endpoints and handlers

import express from "express"
import AccomoModel from "./AccomoSchema.js"


const AccomoRouter = express.Router()

AccomoRouter.post("/", async (req, res,next) => {
    try {
        const newAccomo= new AccomoSchema(req.body)
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
        await req.user.deleteOne()
        res.send()
      } catch (error) {
        next(error)
      }
})

export default AccomoRouter