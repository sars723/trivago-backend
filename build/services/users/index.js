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
var schema_js_1 = __importDefault(require("./schema.js"));
var host_validation_middlew_js_1 = require("../../OAuth/host_validation_middlew.js");
var jwt_aux_js_1 = require("../../OAuth/jwt-aux.js");
var jwt_middle_js_1 = require("../../OAuth/jwt-middle.js");
var http_errors_1 = __importDefault(require("http-errors"));
var passport_1 = __importDefault(require("passport"));
var validation_js_1 = require("./validation.js");
var express_validator_1 = require("express-validator");
var AccomoSchema_js_1 = __importDefault(require("../accommodation/AccomoSchema.js"));
var usersRouter = express_1.default.Router();
usersRouter.get("/me/accommodation", jwt_middle_js_1.JWTAuthMiddleware, host_validation_middlew_js_1.onlyHostAllowedRoute, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var retrievedAccommodations, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, AccomoSchema_js_1.default.find({ host: req.user._id })];
            case 1:
                retrievedAccommodations = _a.sent();
                res.send(retrievedAccommodations);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
usersRouter.post("/register", validation_js_1.usersValidationMiddleware, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errorsList, newUser, _id, _a, accessToken, refreshToken, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                errorsList = (0, express_validator_1.validationResult)(req);
                if (!!errorsList.isEmpty()) return [3 /*break*/, 1];
                next((0, http_errors_1.default)(400, { errorsList: errorsList }));
                return [3 /*break*/, 4];
            case 1:
                newUser = new schema_js_1.default(req.body);
                return [4 /*yield*/, newUser.save()];
            case 2:
                _id = (_b.sent())._id;
                return [4 /*yield*/, (0, jwt_aux_js_1.generatePairOfTokens)(newUser)];
            case 3:
                _a = _b.sent(), accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                res.status(201).send({ accessToken: accessToken, refreshToken: refreshToken });
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//return all the users for us to have a list of users
usersRouter.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, schema_js_1.default.find()];
            case 1:
                users = _a.sent();
                res.send(users);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
usersRouter.get("/me", jwt_middle_js_1.JWTAuthMiddleware, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.send(req.user);
        }
        catch (error) {
            next(error);
        }
        return [2 /*return*/];
    });
}); });
usersRouter.put("/me", jwt_middle_js_1.JWTAuthMiddleware, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, updatedUser, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userID = req.user._id;
                console.log(userID);
                return [4 /*yield*/, schema_js_1.default.findByIdAndUpdate(userID, req.body, {
                        new: true
                    })];
            case 1:
                updatedUser = _a.sent();
                if (updatedUser) {
                    res.send(updatedUser);
                }
                else {
                    res.status(404).send("not found");
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
usersRouter.delete("/me", jwt_middle_js_1.JWTAuthMiddleware, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, req.user.deleteOne()];
            case 1:
                _a.sent();
                res.send("deleted");
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
usersRouter.post("/login", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, accessToken, refreshToken, error_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, schema_js_1.default.checkCredentials(email, password)];
            case 1:
                user = _c.sent();
                console.log(user);
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, jwt_aux_js_1.generatePairOfTokens)(user)];
            case 2:
                _b = _c.sent(), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                res.send({ accessToken: accessToken, refreshToken: refreshToken });
                return [3 /*break*/, 4];
            case 3:
                next((0, http_errors_1.default)(401, "Credentials are not ok!"));
                _c.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_5 = _c.sent();
                next(error_5);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
usersRouter.get('/facebookLogin', passport_1.default.authenticate('facebook', { scope: ['email'] }));
usersRouter.get('/facebookRedirect', passport_1.default.authenticate('facebook'), function (req, res, next) {
    try {
        console.log(req.user);
        res.redirect("http://localhost:3000/?accessToken=" + req.user.tokens.accessToken + "&refreshToken=" + req.user.tokens.refreshToken);
    }
    catch (error) {
        next(error);
    }
});
exports.default = usersRouter;
