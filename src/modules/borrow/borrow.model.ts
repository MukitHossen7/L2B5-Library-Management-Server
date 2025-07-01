import { HydratedDocument, model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";
import Book from "../book/book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Deduct the requested quantity from the book's available copies use post middleware hook

borrowSchema.post(
  "save",
  async function (doc: HydratedDocument<IBorrow>, next: () => void) {
    await Book.findByIdAndUpdate(
      doc.book,
      {
        $inc: {
          copies: -doc.quantity,
        },
      },
      { new: true, runValidators: true }
    );
    await Book.updateAvailability(doc.book.toString());
    next();
  }
);

const Borrow = model<IBorrow>("Borrow", borrowSchema);
export default Borrow;
