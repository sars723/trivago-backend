import mongoose  from "mongoose";



const {Schema, model} = mongoose

const AccomoSchema = new Schema(
    {
      name: { type: String, required: true },
      host: { type: String, required: true, enum:["User"], default: "User" },
      description: { type: String, required: true },
      maxGuests : { type: Number, required: true },
      city: { type: String, required: true },
    },
    { timestamps: true }
  )

  export default AccomoModel("Accomodation", AccomoModel)