import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema, model } = mongoose


// name surname must be required
const UserSchema = new Schema(
    {
        name: { type: String },
        surname: { type: String },
        email: { type: String, required: true, unique: true/*  [true, "email must be unique"] */ },
        password: { type: String },
        facebook_Id: { type: String },
        role: { type: String, required: true, enum: ["host", "guest"], default: "guest" },
    },
    { timestamps: true }
)

UserSchema.pre("save", async function (next) {

    const newUser = this
    const plainPW = newUser.password

    if (newUser.isModified("password")) {

        newUser.password = await bcrypt.hash(plainPW, 10)
    }
    next()
})

UserSchema.methods.toJSON = function () {

    const userDocument = this

    const userObject = userDocument.toObject()

    delete userObject.password

    return userObject
}

UserSchema.statics.checkCredentials = async function (email, plainPW) {

    const user = await this.findOne({ email })
    console.log(user)
    if (user) {

        const isMatch = await bcrypt.compare(plainPW, user.password)

        if (isMatch) return user
        else return null
    } else {
        return null
    }
}
export default model("User", UserSchema)