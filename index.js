const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const users = require("./app/routes/users");
const podcast = require("./app/routes/podcast");
const tag = require("./app/routes/tag");
const category = require("./app/routes/category");
const follower = require("./app/routes/follower");

require("./app/config/db");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/users", users);
app.use("/api/podcast", podcast);
app.use("/api/tag", tag);
app.use("/api/category", category);
app.use("/api/follower", follower);

app.use(express.json({ extended: false }));
const port = process.env.PORT || 3050;

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
