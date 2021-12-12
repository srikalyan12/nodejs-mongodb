const express = require("express");
const path = require("path");
const adminRoute = require("./admin");
const {
  getProduct,
  getIndex,
  getCheckout,
  getCart,
  getOrders,
  getProductDetails,
  postCart,
  postCartDelete,
  postOrder,
} = require("../controllers/shop");

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProduct);

router.get("/cart", getCart);

router.post("/cart", postCart);

router.get("/orders", getOrders);

// router.get("/checkout", getCheckout);

router.post("/products/:productId", getProductDetails);

router.post("/cart-delete-item", postCartDelete);

router.post("/create-order", postOrder);

module.exports = router;
