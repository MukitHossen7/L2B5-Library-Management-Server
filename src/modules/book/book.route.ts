import express from "express";
import { bookController } from "./book.controller";

const bookRoute = express.Router();

bookRoute.post("/", bookController.createBook);
bookRoute.get("/", bookController.getAllBooks);
bookRoute.get("/:bookId", bookController.getBookByID);
bookRoute.put("/:bookId", bookController.updateBook);
bookRoute.delete("/:bookId", bookController.deleteBook);

export default bookRoute;
