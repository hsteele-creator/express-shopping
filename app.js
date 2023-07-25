const express = require("express")
const app = express();
const shoppingRoutes = require("./shoppingRoutes");

app.use(express.json())
app.use("/items", shoppingRoutes)


module.exports = app