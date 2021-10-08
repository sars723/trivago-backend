"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notFoundErrorHandler = function (err, req, res, next) {
    if (err.status === 404) {
        res.status(404).send({
            success: false,
            msg: err.message
        });
    }
    else {
        next(err);
    }
};
var badRequestErrorHandler = function (err, req, res, next) {
    if (err.status === 400) {
        res.status(400).send({
            success: false,
            msg: err,
        });
    }
    else {
        next(err);
    }
};
var unauthorizedHandler = function (err, req, res, next) {
    if (err.status === 401) {
        console.log(err);
        res.status(401).send({ status: "error", message: err.message || "You are not logged in!" });
    }
    else {
        next(err);
    }
};
var forbiddenRequest = function (err, req, res, next) {
    if (err.status === 403) {
        res.status(400).send({
            success: false,
            msg: err,
        });
    }
    else {
        next(err);
    }
};
var serverErrorHandler = function (err, req, res, next) {
    console.log(err);
    res.status(500).send("I'm having some existential crisis at the moment, ask me later!");
};
var errorHandlers = {
    notFound: notFoundErrorHandler,
    badRequest: badRequestErrorHandler,
    forbidden: forbiddenRequest,
    server: serverErrorHandler,
    unauthorizedHandler: unauthorizedHandler
};
exports.default = errorHandlers;
