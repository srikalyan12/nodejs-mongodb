const Product = require("../models/products");

const getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};
const postAddProduct = (req, res) => {
  const { title, price, description, imageUrl } = req.body;

  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );

  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

const getEditProduct = (req, res) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/add-product",
        product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProduct = (req, res) => {
  Product.fetchAll().then((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

const postEditProduct = (req, res) => {
  const { title, price, description, imageUrl, _id } = req.body;
  const product = new Product(title, price, description, imageUrl, _id);
  product
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch(() => console.log("Post edit product", err));
  // const products = Product.editProduct(product, () => {
  //   res.redirect('/admin/products');
  // });
};

const postDeleteProduct = (req, res) => {
  const productId = req.params.productId;
  Product.delateById(productId)
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
