require("dotenv").config();
const express = require("express");
const notFound = require("./middlewares/not-found");
const authRoute = require("./routes/auth-route");
const todoRoute = require("./routes/todo-route");
const errorMiddleware = require("./middlewares/error-middleware");
const authenticate = require("./middlewares/authenticate");

const app = express();

app.use(express.json());

app.use("/auth", authRoute);
app.use("/todos", authenticate, todoRoute);
// app.use("/service", authenticate);

app.use("*", notFound);
app.use(errorMiddleware);

let port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server on", port));
