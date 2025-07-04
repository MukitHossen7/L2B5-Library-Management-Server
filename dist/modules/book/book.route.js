"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const bookRoute = express_1.default.Router();
bookRoute.post("/", book_controller_1.bookController.createBook);
bookRoute.get("/", book_controller_1.bookController.getAllBooks);
bookRoute.get("/highest-copies", book_controller_1.bookController.getHighestCopiesBooks);
bookRoute.get("/:bookId", book_controller_1.bookController.getBookByID);
bookRoute.put("/:bookId", book_controller_1.bookController.updateBook);
bookRoute.delete("/:bookId", book_controller_1.bookController.deleteBook);
exports.default = bookRoute;
