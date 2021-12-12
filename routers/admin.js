const express = require("express");
const {
  getAddProduct,
  postAddProduct,
  getProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/admin");

const router = express.Router();

const products = [];

router.get("/add-product", getAddProduct);

router.get("/products", getProduct);

router.post("/product", postAddProduct);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post("/delete-product/:productId", postDeleteProduct);

module.exports = { router };
