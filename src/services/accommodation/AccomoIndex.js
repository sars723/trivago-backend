
import express from "express"
import AccomoModel from "./AccomoSchema.js"
import { JWTAuthMiddleware } from "../../OAuth/jwt-middle.js"
import { onlyHostAllowedRoute } from "../../OAuth/host_validation_middlew.js"
import createError from "http-errors"
import { validationResult } from "express-validator"
import { accommoValidation } from './validation.js'



const AccomoRouter = express.Router()

// POST /accommodation
AccomoRouter.post("/", JWTAuthMiddleware, onlyHostAllowedRoute, accommoValidation, async (req, res, next) => {
  try {
    const errorsList = validationResult(req)
    if (!errorsList.isEmpty()) {
      next(createError(400, { errorsList }))
    } else {

      const userID = req.user._id
      console.log(req.user._id, 'just ID')
      // console.log(userId , 'USER ID')
      const mergedData = {
        ...req.body,
        host: userID
      }

      const newAccomo = new AccomoModel(mergedData)

      const savedAccomo = await newAccomo.save()
      console.log(savedAccomo)

      res.status(201).send(savedAccomo)
    }
  } catch (error) {
    next(createError(400, `Invalid Id: ${error}}!`))
  }
})

AccomoRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const accommodations = await AccomoModel.find().populate('host')
    res.send(accommodations)
  } catch (error) {
    next(error)
  }
})

// get single accommodation by ID
AccomoRouter.get("/:_id", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const accommodations = await AccomoModel.findById(req.params._id)
    res.send(accommodations)
  } catch (error) {
    next(error)
  }
})

// PUT /accommodation/:id
AccomoRouter.put("/:_id", JWTAuthMiddleware, onlyHostAllowedRoute, accommoValidation, async (req, res, next) => {

  try {
    const errorsList = validationResult(req)
    if (!errorsList.isEmpty()) {
      next(createError(400, { errorsList }))
    } else {
      const accomoId = req.params._id;


      const modifiedAccomo = await AccomoModel.findOneAndUpdate(
        {
          _id: accomoId,
          host: req.user._id
        },
        {
          ...req.body
        },
        {
          new: true
        }
      );
      console.log(modifiedAccomo)

      if (modifiedAccomo) {
        res.status(201).send(modifiedAccomo);
      } else {
        next(createError(404, `Accommodation not found!`));
      }
    }
  } catch (error) {
    next(error);
  }

})

AccomoRouter.delete("/:_id", JWTAuthMiddleware, onlyHostAllowedRoute, async (req, res, next) => {
  try {
    const accomoId = req.params._id;
    const searchAccommo = await AccomoModel.findOne(
      {
        _id: accomoId,
        host: req.user._id
      },
    )
    if(searchAccommo){
      searchAccommo.remove()

      res.status(204).send()
    } else {
      next(createError(404, `Accommodation with id ${accomoId} does not exists!`))
    }

    

  } catch (error) {
    next(error)
  }
})

export default AccomoRouter