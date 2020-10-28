const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const url = process.env.DATABASE;

mongoose
  .connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected!!!`);
  })
  .catch((err) => console.error(err.message));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
