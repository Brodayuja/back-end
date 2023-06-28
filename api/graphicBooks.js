const express = require("express");
const graphicBooksRouter = express.Router();
const { createGraphicNovelBook, getAllGraphicNovelBooks, getAllGraphicNovelBooksByISBN, updateGraphicNovelBook, destroyGraphicNovelBook } = require("../db/graphicBooks.js");

graphicBooksRouter.get("/", async (req, res, next) => {
  try {
    const allGraphicBooks = await getAllGraphicNovelBooks()
    res.send(allGraphicBooks);
  } catch (error) {
    next(error);
  }
});

graphicBooksRouter.get("/:isbn", async (req, res, next) => {
    try {
      console.log(req.params.isbn)
      const singleGraphicBook = await getAllGraphicNovelBooksByISBN(Number(req.params.isbn))
      res.send(singleGraphicBook)
    } catch (error) {
      next (error)
    }
    });


graphicBooksRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newGraphicBook = await createGraphicNovelBook(req.body);
    res.send(newGraphicBook);
  } catch (error) {
    next(error);
  }
});

graphicBooksRouter.delete("/:isbn", async (req, res) => {
  try {
    console.log(req.params.isbn)
    const deletedGraphicBook = await destroyGraphicNovelBook(Number(req.params.isbn))
    res.send(deletedGraphicBook)
  } catch (error) {
    throw (error)
  }
});

graphicBooksRouter.put("/:isbn", async (req, res) => {
  try {
    console.log(req.params.isbn)
    const bookISBN = Number(req.params.isbn)
    const updatedData = req.body
    const NewlyUpdatedGraphicBook = await updateGraphicNovelBook(bookISBN, updatedData)
    res.send(NewlyUpdatedGraphicBook)
  } catch (error) {
    throw (error)
  }
})

module.exports = graphicBooksRouter;