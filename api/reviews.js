const express = require("express");
const reviewsRouter = express.Router();
const { createReview, getAllReviews, getReviewsByUserId, updateReview, destroyReview } = require("../db/reviews.js");

reviewsRouter.get("/:id", async (req, res, next) => {
    try {
      console.log(req.params.id)
      const singleReview = await getReviewsByUserId(Number(req.params.id))
      res.send(singleReview)
    } catch (error) {
      next (error)
    }
    });

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const allReviews = await getAllReviews()
    res.send(allReviews);
  } catch (error) {
    next(error);
  }  
});  

reviewsRouter.post("/", async (req, res, next) => {
  try {
    const {
      content,
      score,
      userId,
      nfBookISBN,
      fictionBookISBN,
      graphicBookISBN,
      bookClubBookISBN,
      childrensBookISBN,
      isInappropriate,
      isNotAccurate,
      comment,
    } = req.body;

    const newReview = await createReview(
      content,
      score,
      userId,
      nfBookISBN,
      fictionBookISBN,
      graphicBookISBN,
      bookClubBookISBN,
      childrensBookISBN,
      isInappropriate,
      isNotAccurate,
      comment
    );

    res.send(newReview);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.delete("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id)
    const deletedReview = await destroyReview(Number(req.params.id))
    res.send(deletedReview)
  } catch (error) {
    next (error)
  }
});

reviewsRouter.put("/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const reviewId = Number(req.params.id)
    const updatedData = req.body
    const NewlyUpdatedReview = await updateReview(reviewId, updatedData)
    res.send(NewlyUpdatedReview)
  } catch (error) {
    throw (error)
  }
});

module.exports = reviewsRouter;