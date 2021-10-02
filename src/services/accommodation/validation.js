import { body } from "express-validator"

export const accommoValidation = [
    body("name").exists().withMessage("Name is a mandatory field!"),
    body("description").exists().withMessage("Please send a valid description!"),
    body("city").exists().withMessage("Please send a valid city!"),
    body("maxGuests").exists().withMessage("Please send a valid maxGuests!"),
]
