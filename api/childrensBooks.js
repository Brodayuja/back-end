const express = require("express");
const childrensBooksRouter = express.Router();
const { createChildrensBook, getAllChildrensBooks, getAllChildrensBooksByISBN, updateChildrensBook, destroyChildrensBook } = require("../db/childrensBooks.js");

childrensBooksRouter.get("/:isbn", async (req, res, next) => {
    try {
      console.log(req.params.isbn)
      const singleChildrensBook = await getAllChildrensBooksByISBN(Number(req.params.isbn))
      res.send(singleChildrensBook)
    } catch (error) {
      next (error)
    }
    });

childrensBooksRouter.get("/", async (req, res, next) => {
  try {
    const allChildrensBooks = await getAllChildrensBooks()
    res.send(allChildrensBooks);
  } catch (error) {
    next(error);
  }
});

childrensBooksRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newChildrensBook = await createChildrensBook(req.body);
    res.send(newChildrensBook);
  } catch (error) {
    next(error);
  }
});

childrensBooksRouter.delete("/:isbn", async (req, res) => {
  try {
    console.log(req.params.isbn)
    const deletedChildrensBook = await destroyChildrensBook(Number(req.params.isbn))
    res.send(deletedChildrensBook)
  } catch (error) {
    throw (error)
  }
});

childrensBooksRouter.put("/:isbn", async (req, res) => {
  try {
    console.log(req.params.isbn)
    const bookISBN = Number(req.params.isbn)
    const updatedData = req.body
    const NewlyUpdatedChildrensBook = await updateChildrensBook(bookISBN, updatedData)
    res.send(NewlyUpdatedChildrensBook)
  } catch (error) {
    throw (error)
  }
})

module.exports = childrensBooksRouter;