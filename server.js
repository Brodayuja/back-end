require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const jwt = require("jsonwebtoken");

const passport = require("passport");
require("./passportConfig")(passport);

const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

const client = require("./db/index");
client.connect();

// Redirect the user to the Google signin page
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
// Retrieve user data using the access token received
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    jwt.sign(
      { user: req.user },
      "secretKey",
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return res.json({
            token: null,
          });
        }
        res.json({
          token,
        });
      }
    );
  }
);
// profile route after successful sign in
app.get("/profile", (req, res) => {
  console.log(req);
  res.send("Welcome");
});

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send("Welcome");
  }
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.use(express.json());

app.use("/api", require("./api"));

app.listen(PORT, () => {
  console.log(`The server is up and running on port: ${PORT}`);
});
