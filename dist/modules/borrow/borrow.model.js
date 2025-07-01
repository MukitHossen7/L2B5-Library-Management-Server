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
const mongoose_1 = require("mongoose");
const book_model_1 = __importDefault(require("../book/book.model"));
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "bookId must be required"],
    },
    quantity: {
        type: Number,
        required: [true, "quantity must be required"],
        min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
        type: Date,
        required: [true, "dueDate must be required"],
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Deduct the requested quantity from the book's available copies use post middleware hook
borrowSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield book_model_1.default.findByIdAndUpdate(doc.book, {
            $inc: {
                copies: -doc.quantity,
            },
        }, { new: true, runValidators: true });
        yield book_model_1.default.updateAvailability(doc.book.toString());
        next();
    });
});
const Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
exports.default = Borrow;
