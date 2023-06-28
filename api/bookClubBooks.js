const express = require("express");
const bookClubBooksRouter = express.Router();
const { createBookClubPicksBook, getAllBookClubPicksBooks, getAllBookClubPicksBooksByISBN, updateBookClubPicksBook, destroyBookClubPicksBook } = require("../db/bookClubBooks.js");

bookClubBooksRouter.get("/book-club-picks", async (req, res, next) => {
  try {
    const allBookClubPicks = await getAllBookClubPicksBooks()
    res.send(allBookClubPicks);
  } catch (error) {
    next(error);
  }
});

bookClubBooksRouter.get("/book-club-picks/:isbn", async (req, res, next) => {
    try {
      console.log(req.params.isbn)
      const singleBookClubPick = await getAllBookClubPicksBooksByISBN(Number(req.params.isbn))
      res.send(singleBookClubPick)
    } catch (error) {
      next (error)
    }
    });


bookClubBooksRouter.post("/book-club-picks", async (req, res, next) => {
  try {
    console.log(req.body);
    const newBookClubPick = await createBookClubPicksBook(req.body);
    res.send(newBookClubPick);
  } catch (error) {
    next(error);
  }
});

bookClubBooksRouter.delete("/book-club-picks/:isbn", async (req, res) => {
  try {
    console.log(req.params.isbn)
    const deletedBookClubPick = await destroyBookClubPicksBook(Number(req.params.isbn))
    res.send(deletedBookClubPick)
  } catch (error) {
    throw (error)
  }
});

// bookClubBooksRouter.put("/book-club-picks/:isbn", async (req, res) => {
//   try {
//     console.log(req.params.isbn)
//     const bookISBN = Number(req.params.isbn)
//     const updatedData = req.body
//     const NewlyUpdatedBookClubPick = await updateBookClubPicksBook(bookISBN, updatedData)
//     res.send(NewlyUpdatedBookClubPick)
//   } catch (error) {
//     throw (error)
//   }
// })

module.exports = bookClubBooksRouter;