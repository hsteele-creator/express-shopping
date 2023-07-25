const express = require("express");
const router = new express.Router();
const ExpressError = require("./ExpressError");

let cartItems = [];

router.get("/", (req, res) => {
  res.json(cartItems);
});

router.post("/", (req, res, next) => {
  try {
    if (!req.body) throw new ExpressError("You must add a new item", 400);
    cartItems.push({ name: req.body.name, price: req.body.price })
    res.json({ added: { name: req.body.name, price: req.body.price } });
  } catch (e) {
    next(e);
  }
});

router.get("/:name", (req, res, next) => {
  try {
    const item = cartItems.find((item) => item.name === req.params.name);
    if (!item) throw new ExpressError("The item does not exist", 400);
    res.json(item);
  } catch (e) {
    next(e);
  }
});

router.patch("/:name", (req, res, next) => {
  try {
    const item = cartItems.find((item) => item.name === req.params.name);
    if (!item) throw new ExpressError("The item does not exist", 400);

    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;

    res.json({ updated: item });
  } catch (e) {
    next(e);
  }
});

router.delete("/:name", (req, res, next) => {
  try {
    const item = cartItems.find((item) => item.name === req.params.name);
    if (!item) throw new ExpressError("The item does not exist", 400);

    cartItems.splice(item, 1)

    res.json({ message: "Deleted"});
  } catch (e) {
    next(e);
  }
});

module.exports = router
