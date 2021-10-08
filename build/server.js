"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var AccomoIndex_js_1 = __importDefault(require("./src/services/accommodation/AccomoIndex.js")); //-<<<< for accommodation please use the same exact line
var index_js_1 = __importDefault(require("./src/services/users/index.js")); // for user routes same exact line
var index_js_2 = __importDefault(require("./src/library/index.js"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var strategy_config_js_1 = require("./src/OAuth/OAuth_Strategies/strategy-config.js");
var errorHandlers = index_js_2.default.errorHandlers, serverConfig = index_js_2.default.serverConfig;
var server = (0, express_1.default)();
var PORT = process.env.PORT;
passport_1.default.use('facebook', strategy_config_js_1.facebookStrategy);
server.use(express_1.default.json());
server.use((0, cors_1.default)(serverConfig));
server.use(passport_1.default.initialize());
server.use("/accommodation", AccomoIndex_js_1.default); // rename and use for accommodation same exact line
server.use("/users", index_js_1.default); //use for user same exact line
server.use(errorHandlers.forbidden);
server.use(errorHandlers.notFound);
server.use(errorHandlers.badRequest);
server.use(errorHandlers.unauthorizedHandler);
server.use(errorHandlers.server);
mongoose_1.default.connect(process.env.MONGO_CONN);
mongoose_1.default.connection.on('connected', function () {
    console.log('Mongo connected');
    server.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("🚀 Server is running on port ", PORT);
            return [2 /*return*/];
        });
    }); });
    mongoose_1.default.connection.on('error', function (error) {
        console.log('Mongo error: ', error);
    });
    server.on("error", function (error) {
        return console.log("🚀 Server is crashed due to ", error);
    });
});
