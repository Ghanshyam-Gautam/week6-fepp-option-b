const express = require("express");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookControllers");

const router = express.Router();

router.get("/", getAllBooks);          // GET all books
router.post("/", createBook);          // POST new book
router.get("/:bookId", getBookById);   // GET single book by ID
router.put("/:bookId", updateBook);    // UPDATE book
router.delete("/:bookId", deleteBook); // DELETE book

module.exports = router;