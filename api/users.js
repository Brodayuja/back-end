const express = require("express");
const usersRouter = express.Router();


usersRouter.get("/", async (req, res, next) => {
  try {

    res.send("I am the user router");
  } catch (error) {
    next(error);
  }
});


module.exports = usersRouter;