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
exports.bookController = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const data = yield book_model_1.default.create(payload);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Book created failed",
            success: false,
            error,
        });
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sort = "desc", limit = 10, sortBy = "createdAt", } = req.query;
        const filters = {};
        if (filter) {
            filters.genre = filter;
        }
        const data = yield book_model_1.default.find(filters)
            .sort({ [sortBy]: sort === "desc" ? -1 : 1 })
            .limit(Number(limit));
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Books retrieved failed",
            success: false,
            error,
        });
    }
});
const getBookByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const data = yield book_model_1.default.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Book retrieved failed",
            success: false,
            error,
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const payload = req.body;
        const data = yield book_model_1.default.findByIdAndUpdate(bookId, payload, {
            new: true,
            runValidators: true,
        });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Book updated failed",
            success: false,
            error,
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield book_model_1.default.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Book deleted failed",
            success: false,
            error,
        });
    }
});
exports.bookController = {
    createBook,
    getAllBooks,
    getBookByID,
    updateBook,
    deleteBook,
};
