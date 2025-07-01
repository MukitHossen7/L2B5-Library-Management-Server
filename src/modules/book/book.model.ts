import { model, Schema } from "mongoose";
import { IBook, UpdateAvailabilityMethod } from "./book.interface";

const bookSchema = new Schema<IBook, UpdateAvailabilityMethod>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// implement If copies become 0, update available to false using a static method
bookSchema.static(
  "updateAvailability",
  async function updateAvailabilityFunction(id: string) {
    const findBook = await Book.findById(id);
    if (findBook && findBook?.copies === 0 && findBook.available !== false) {
      // findBook.available = false;
      // await findBook.save();
      await Book.findByIdAndUpdate(
        id,
        {
          $set: {
            available: false,
          },
        },
        { runValidators: true }
      );
    }
  }
);

const Book = model<IBook, UpdateAvailabilityMethod>("Book", bookSchema);
export default Book;
