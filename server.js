const express = require("express")
const app = express()
const PORT = 3000

const morgan = require("morgan")
app.use(morgan("dev"))

const cors = require("cors")
app.use(cors())

const client = require('./db/client')
client.connect()

app.use(express.json());

app.use("/api", require("./api"));

app.listen(PORT, () => {
  console.log(`The server is up and running on port: ${PORT}`);
});