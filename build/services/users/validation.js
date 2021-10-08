"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersValidationMiddleware = void 0;
var express_validator_1 = require("express-validator");
exports.usersValidationMiddleware = [
    (0, express_validator_1.body)("password").exists().withMessage("Password is a mandatory field!"),
    (0, express_validator_1.body)("email").exists("Email is a mandatory field!").isEmail().withMessage("Please send a valid email!"),
];
