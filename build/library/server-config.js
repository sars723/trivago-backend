"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trustOrigins = [
    process.env.FE_DEV_TRUST_URL,
    process.env.FE_PROD_TRUST_URL,
    process.env.FE_PROD_TRUST_URL_2,
    process.env.FE_PROD_TRUST_URL_3,
    process.env.FE_PROD_TRUST_URL_4,
];
var corsConfig = {
    origin: function (origin, callback) {
        if (!origin || trustOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Origin not allowed"));
        }
    },
};
var serverConfig = {
    corsConfig: corsConfig
};
exports.default = serverConfig;
