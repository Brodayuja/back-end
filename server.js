require('dotenv').config();
const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path')


const morgan = require("morgan")
app.use(morgan("dev"))

const cors = require("cors")
app.use(cors())

const client = require('./db/index')
client.connect()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.use(express.json());

app.use("/api", require("./api"));

app.listen(PORT, () => {
  console.log(`The server is up and running on port: ${PORT}`);
});