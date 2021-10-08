"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accommoValidation = void 0;
var express_validator_1 = require("express-validator");
exports.accommoValidation = [
    (0, express_validator_1.body)("name").exists().withMessage("Name is a mandatory field!"),
    (0, express_validator_1.body)("description").exists().withMessage("Please send a valid description!"),
    (0, express_validator_1.body)("city").exists().withMessage("Please send a valid city!"),
    (0, express_validator_1.body)("maxGuests").exists().withMessage("Please send a valid maxGuests!"),
];
