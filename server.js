const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOption = {
  origin: 'http://127.0.0.1:3000'
}

app.use(cors(corsOption))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true}))

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to myBlog-Post application." });
});

app.get("/api/posts", (req, res) => {
  res.json({ message: "List of posts." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});