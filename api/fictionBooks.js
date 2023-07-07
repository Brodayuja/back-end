const express = require("express");
const fictionBooksRouter = express.Router();
const {createFictionBook, getAllFictionBooks, getAllFictionBooksByISBN, updateFictionBook, destroyFictionBook } = require("../db/fictionBooks.js");

fictionBooksRouter.get("/:isbn", async (req, res, next) => {
    try {
      console.log(req.params.isbn)
      const singleFictionBook = await getAllFictionBooksByISBN(Number(req.params.isbn))
      res.send(singleFictionBook)
    } catch (error) {
      next (error)
    }
    });

fictionBooksRouter.get("/", async (req, res, next) => {
  try {
    const allFictionBooks = await getAllFictionBooks()
    res.send(allFictionBooks);
  } catch (error) {
    next(error);
  }  
});  


fictionBooksRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newFictionBook = await createFictionBook(req.body);
    res.send(newFictionBook);
  } catch (error) {
    next(error);
  }
});

fictionBooksRouter.delete("/:isbn", async (req, res) => {
  try {
    console.log(req.params.isbn)
    const deletedFictionBook = await destroyFictionBook(Number(req.params.isbn))
    res.send(deletedFictionBook)
  } catch (error) {
    throw (error)
  }
});

fictionBooksRouter.put("/:isbn", async (req, res) => {
  try {
    console.log(req.params.isbn)
    const bookISBN = Number(req.params.isbn)
    const updatedData = req.body
    const NewlyUpdatedFictionBook = await updateFictionBook(bookISBN, updatedData)
    res.send(NewlyUpdatedFictionBook)
  } catch (error) {
    throw (error)
  }
})

module.exports = fictionBooksRouter;