const db = require("../models");
const dotenv = require("dotenv");
dotenv.config();

//connect to MongoDB server
db.mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });
