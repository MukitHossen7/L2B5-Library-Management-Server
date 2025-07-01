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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookController = void 0;
const book_model_1 = __importDefault(require("../book/book.model"));
const borrow_model_1 = __importDefault(require("./borrow.model"));
const createBorrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const findBook = yield book_model_1.default.findById(book);
        //check the book is available
        if (!findBook) {
            res.status(404).json({
                message: "Book not found",
                success: false,
                error: "Invalid book ID",
            });
            return;
        }
        //Verify the book has enough available copies.
        if (!((findBook === null || findBook === void 0 ? void 0 : findBook.copies) >= quantity)) {
            res.status(400).json({
                message: "Book does not have enough available copies",
                success: false,
                error: "Not enough copies available",
            });
            return;
        }
        // Save the borrow record with all relevant details
        const data = yield borrow_model_1.default.create({ book, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Book borrowed failed",
            success: false,
            error,
        });
    }
});
const getBorrowedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book",
                },
            },
            {
                $unwind: "$book",
            },
            {
                $project: {
                    totalQuantity: 1,
                    book: {
                        title: 1,
                        isbn: 1,
                    },
                    _id: 0,
                },
            },
        ]);
        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Borrowed books summary retrieved  failed",
            success: false,
            error,
        });
    }
});
exports.borrowBookController = {
    createBorrowBook,
    getBorrowedBooks,
};
