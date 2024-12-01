const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middleware/errorHandler.middleware");

const app = express();

app.use(bodyParser.json());

app.use("/tasks", taskRoutes);
app.use("/health", (req, res) => {
  res.status(200).json({
    message: "Server up",
  });
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

module.exports = app;
