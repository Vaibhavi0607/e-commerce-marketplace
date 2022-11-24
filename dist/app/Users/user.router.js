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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.userRouter = void 0;
var express_1 = require("express");
var bcrypt_1 = __importDefault(require("bcrypt"));
var User_1 = require("../../models/User");
var router = (0, express_1.Router)();
// Register User
router.post('/api/auth/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 10)];
            case 1:
                hashedPassword = _a.sent();
                data = new User_1.User({
                    username: req.body.username,
                    password: hashedPassword,
                    userType: req.body.userType,
                    email: req.body.email,
                    address: req.body.address,
                    catalog: req.body.catalog
                });
                return [4 /*yield*/, data.save()];
            case 2:
                _a.sent();
                res.status(201).json('User created');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(400).json("Error in creating user: ".concat(error_1.message));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Login User
router.post('/api/auth/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var password, existingUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = '';
                return [4 /*yield*/, User_1.User.findOne({ username: req.body.username })];
            case 1:
                existingUser = _a.sent();
                if (!existingUser) {
                    res.status(400).json('User not found');
                }
                else {
                    password = existingUser.password;
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, password)];
            case 3:
                if (_a.sent()) {
                    res.status(200).json('Logged in successfully');
                }
                else {
                    res.status(400).json('Password did not match');
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.status(400).json("Error in logging user: ".concat(error_2.message));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Delete User by user id
router.delete('/api/remove/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteUser, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.User.deleteOne({ _id: req.params.userId })];
            case 1:
                deleteUser = _a.sent();
                if (!deleteUser) {
                    res.status(400).json('User not found to delete');
                }
                res.status(200).json(deleteUser);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400).json(error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get all Users
router.get('/api/getAllUsers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.User.find()];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(400).json("Error in getting all users: ".concat(error_4.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get all sellers
router.get('/api/buyer/list-of-sellers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sellers, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.User.find({ userType: 'SELLER' })];
            case 1:
                sellers = _a.sent();
                if (sellers.length !== 0) {
                    res.status(200).json(sellers);
                }
                else {
                    res.status(400).json('No sellers found');
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(400).json("Error in getting sellers: ".concat(error_5.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get all buyers
router.get('/api/list-of-buyers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var buyers, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.User.find({ userType: 'BUYER' })];
            case 1:
                buyers = _a.sent();
                if (buyers.length !== 0) {
                    res.status(200).json(buyers);
                }
                else {
                    res.status(400).json('No buyers found');
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(400).json("Error in getting sellers: ".concat(error_6.message));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.userRouter = router;
