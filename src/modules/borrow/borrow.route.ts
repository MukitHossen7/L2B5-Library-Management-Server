import express from "express";
import { borrowBookController } from "./borrow.controller";

const borrowBookRoute = express.Router();

borrowBookRoute.post("/", borrowBookController.createBorrowBook);
borrowBookRoute.get("/", borrowBookController.getBorrowedBooks);

export default borrowBookRoute;
