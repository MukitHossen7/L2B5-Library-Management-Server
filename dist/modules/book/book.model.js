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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "title must be required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "author must be required"],
        trim: true,
    },
    genre: {
        type: String,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "{VALUE} is not a valid genre",
        },
        required: [true, "genre must be required"],
    },
    isbn: {
        type: String,
        required: [true, "isbn must be required"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "copies must be required"],
        min: [0, "Copies must be a positive number"],
    },
    available: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
        required: [true, "image must be required"],
        trim: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
// implement If copies become 0, update available to false using a static method
bookSchema.static("updateAvailability", function updateAvailabilityFunction(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const findBook = yield Book.findById(id);
        if (findBook && (findBook === null || findBook === void 0 ? void 0 : findBook.copies) === 0 && findBook.available !== false) {
            // findBook.available = false;
            // await findBook.save();
            yield Book.findByIdAndUpdate(id, {
                $set: {
                    available: false,
                },
            }, { runValidators: true });
        }
    });
});
bookSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if ((update === null || update === void 0 ? void 0 : update.copies) === 0) {
            update.available = false;
        }
        if ((update === null || update === void 0 ? void 0 : update.copies) > 0) {
            update.available = true;
        }
        this.setUpdate(update);
        next();
    });
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
