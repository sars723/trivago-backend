import mongoose  from "mongoose";



const {Schema, model} = mongoose

const AccomoSchema = new Schema(
    {
      name: { type: String, required: true },
      host: { type: Schema.Types.ObjectId, ref: "User" },
      description: { type: String, required: true },
      maxGuests : { type: Number, required: true},
      city: { type: String, required: true },
    },
    { timestamps: true }
  )

  export default model("Accomodation", AccomoSchema)