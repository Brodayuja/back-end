const express = require("express");
const nfBooksRouter = express.Router();
const {createNFBook, getAllNFBooks, getAllNFBooksByISBN, updateNFBook, destroyNFBook } = require("../db/nfBooks.js");

nfBooksRouter.get("/nonfiction-books", async (req, res, next) => {
  try {
    const allNFBooks = await getAllNFBooks();

    res.send(allNFBooks);
  } catch (error) {
    next(error);
  }
});

// nfBooksRouter.get("/nonfiction-books/:isbn", async (req, res, next)) => {
//     try {
//         const 
//     } catch (error) {
//         next (error)
//     }
// }

nfBooksRouter.post("/nonfiction-books", async (req, res, next) => {
  try {
    console.log(req.body);
    const newNFBook = await createNFBook(req.body);

    if (newNFBook) {
      res.send(newNFBook);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = purchasesRouter;