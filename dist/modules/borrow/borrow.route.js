"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("./borrow.controller");
const borrowBookRoute = express_1.default.Router();
borrowBookRoute.post("/", borrow_controller_1.borrowBookController.createBorrowBook);
borrowBookRoute.get("/", borrow_controller_1.borrowBookController.getBorrowedBooks);
exports.default = borrowBookRoute;
