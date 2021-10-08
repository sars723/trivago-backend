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
exports.facebookStrategy = void 0;
// import GoogleStrategy from 'passport-google-oauth20'
var passport_facebook_1 = __importDefault(require("passport-facebook"));
var passport_1 = __importDefault(require("passport"));
var schema_js_1 = __importDefault(require("../../services/users/schema.js"));
var jwt_aux_js_1 = require("../jwt-aux.js");
var facebookStrategyConfig = {
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: process.env.API_URL + process.env.PORT + '/users/facebookRedirect',
    profileFields: ['id', 'emails', 'name']
};
exports.facebookStrategy = new passport_facebook_1.default(facebookStrategyConfig, function (accessToken, refreshToken, profile, passportNext) { return __awaiter(void 0, void 0, void 0, function () {
    var user, tokens, newUser, createdUser, savedUser, tokens, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                console.log(profile);
                return [4 /*yield*/, schema_js_1.default.findOne({ facebook_Id: profile.id })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, jwt_aux_js_1.generatePairOfTokens)(user)];
            case 2:
                tokens = _a.sent();
                passportNext(null, { tokens: tokens });
                return [3 /*break*/, 6];
            case 3:
                newUser = {
                    name: profile.name.givenName,
                    surname: profile.name.familyName,
                    email: profile.emails[0].value,
                    role: "guest",
                    facebook_Id: profile.id,
                };
                createdUser = new schema_js_1.default(newUser);
                return [4 /*yield*/, createdUser.save()];
            case 4:
                savedUser = _a.sent();
                return [4 /*yield*/, (0, jwt_aux_js_1.generatePairOfTokens)(savedUser)];
            case 5:
                tokens = _a.sent();
                passportNext(null, { user: savedUser, tokens: tokens });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.log(error_1);
                passportNext(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
passport_1.default.serializeUser(function (user, passportNext) {
    passportNext(null, user);
});
exports.default = exports.facebookStrategy;
// const googleStrategyConfig = {
//     clientID: process.env.GOOGLE_API_OAUTH_ID,
//     clientSecret: process.env.GOOGLE_API_SECRET_KEY,
//     callbackURL: process.env.BE_URL + process.env.PORT + '/user/googleRedirect',
// }
// export const googleStrategy = new GoogleStrategy(
//     googleStrategyConfig
// ,
//     async (accessToken, refreshToken, profile, passportNext) => {
//         try {
//           console.log(profile)
//           const user = await User.findOne({ googleId: profile.id })
//           if (user) {
//             const tokens = await JWTAuthenticate(user)
//             passportNext(null, { tokens })
//           } else {
//             const newUser = {
//               name: profile.name.givenName,
//               surname: profile.name.familyName,
//               email: profile.emails[0].value,
//               role: "User",
//               googleId: profile.id,
//             }
//             const createdUser = new User(newUser)
//             const savedUser = await createdUser.save()
//             const tokens = await JWTAuthenticate(savedUser)
//             passportNext(null, { user: savedUser, tokens })
//           }
//         } catch (error) {
//           console.log(error)
//           passportNext(error)
//         }
//       }
// )
