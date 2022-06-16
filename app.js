const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./db/db");
const port = process.env.PORT || 5000;

const app = express();
db();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to Post-ada");
});

app.use("/api/user", require("./mvc/router/user.router"));
app.use("/api/profile", require("./mvc/router/profile.router"));
app.use("/api/post", require("./mvc/router/post.router"));

server.listen(port, () => {
  console.log(`Runing on this port ${port}`);
});
