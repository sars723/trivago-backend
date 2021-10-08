"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyHostAllowedRoute = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var onlyHostAllowedRoute = function (req, res, next) {
    if (req.user.role === "host") {
        next();
    }
    else {
        next((0, http_errors_1.default)(403, "Host only! You shall not pass!"));
    }
};
exports.onlyHostAllowedRoute = onlyHostAllowedRoute;
