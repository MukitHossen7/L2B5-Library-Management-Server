import { Request, Response } from "express";
import Book from "../book/book.model";
import Borrow from "./borrow.model";

const createBorrowBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { book, quantity, dueDate } = req.body;

    const findBook = await Book.findById(book);

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
    if (!((findBook?.copies as number) >= quantity)) {
      res.status(400).json({
        message: "Book does not have enough available copies",
        success: false,
        error: "Not enough copies available",
      });
      return;
    }
    // Save the borrow record with all relevant details
    const data = await Borrow.create({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Book borrowed failed",
      success: false,
      error,
    });
  }
};

const getBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
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
  } catch (error) {
    res.status(500).json({
      message: "Borrowed books summary retrieved  failed",
      success: false,
      error,
    });
  }
};

export const borrowBookController = {
  createBorrowBook,
  getBorrowedBooks,
};
