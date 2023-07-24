const express = require("express")
const app = express();
const shoppingRoutes = require("./shoppingRoutes");

app.use(express.json())
app.use("/items", shoppingRoutes)

app.listen(3000, () => {
    console.log("The server is running on port 3000")
})
