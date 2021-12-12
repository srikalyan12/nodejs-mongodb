const Product = require("../models/products");

const getProduct = (req, res) => {
  Product.fetchAll()
    .then((rows) => {
      res.render("shop/products-list", {
        prods: rows,
        pageTitle: "All Product",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

const getIndex = (req, res) => {
  Product.fetchAll()
    .then((rows) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log("*****This is from the getIndex", err));
};

const getCart = (req, res) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

const getCheckout = (req, res) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

const getOrders = (req, res) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders,
      });
    })
    .catch((err) => console.log(err));
};

const getProductDetails = (req, res) => {
  const id = req.params.productId;
  Product.findById(id)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        path: "/products",
        pageTitle: product.title,
      });
    })
    .catch((err) => console.log(err));
};

const postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch();
};

const postCartDelete = (req, res) => {
  const prodId = req.body.productId;
  return req.user
    .deleteItemFromCart(prodId)
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};
const postOrder = (req, res) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getProduct,
  getIndex,
  getCheckout,
  getCart,
  getOrders,
  getProductDetails,
  postCart,
  postCartDelete,
  postOrder,
};
