const express = require("express");
const reviewsRouter = express.Router();
const { createReview, getAllReviews, getReviewsByUserId, updateReview, destroyReview } = require("../db/nfBooks.js");

reviewsRouter.get("/reviews", async (req, res, next) => {
  try {
    const allReviews = await getAllReviews()
    res.send(allReviews);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get("/reviews/:id", async (req, res, next) => {
    try {
      console.log(req.params.isbn)
      const singleReview = await getReviewsByUserId(Number(req.params.id))
      res.send(singleReview)
    } catch (error) {
      next (error)
    }
    });


reviewsRouter.post("/reviews", async (req, res, next) => {
  try {
    console.log(req.body);
    const newReview = await createReview(req.body);
    res.send(newReview);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.delete("/reviews/:id", async (req, res) => {
  try {
    console.log(req.params.isbn)
    const deletedReview = await destroyReview(Number(req.params.isbn))
    res.send(deletedReview)
  } catch (error) {
    throw (error)
  }
});

// reviewsRouter.put("/reviews/:id", async (req, res) => {
//   try {
//     console.log(req.params.isbn)
//     const reviewId = Number(req.params.isbn)
//     const updatedData = req.body
//     const NewlyUpdatedReview = await updateReview(reviewId, updatedData)
//     res.send(NewlyUpdatedReview)
//   } catch (error) {
//     throw (error)
//   }
// });

module.exports = reviewsRouter;