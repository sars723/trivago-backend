"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var error_handlers_js_1 = __importDefault(require("./error-handlers.js"));
var server_config_js_1 = __importDefault(require("./server-config.js"));
exports.default = { errorHandlers: error_handlers_js_1.default, serverConfig: server_config_js_1.default, };
