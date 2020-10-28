const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { errorNotFound, errorHandler } = require("./middlewares/errorHandler");
const userRoutes = require("./routes/users");

const app = express();

const url = process.env.DATABASE;

//Database Connection
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

//Middleware
app.use(express.json({ extended: true }));

//route middleware
app.use("/api/users", userRoutes);

//error middleware
app.use(errorNotFound);
app.use(errorHandler);

//Server Setup
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
