const { getDB } = require("../Database/mongoDb");
const mongoDB = require("mongodb");
const { get } = require("express/lib/response");

class User {
  constructor(name, email, cart, _id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = _id;
  }

  save() {
    return getDB().collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updateCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updateCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updateCartItems.push({
        productId: product._id,
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updateCartItems,
    };
    return getDB()
      .collection("users")
      .updateOne(
        { _id: mongoDB.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const productId = this.cart.items.map((i) => i.productId);
    return getDB()
      .collection("products")
      .find({ _id: { $in: productId } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            qty: this.cart.items.find(
              (i) => i.productId.toString() === p._id.toString()
            ).quantity,
          };
        });
      });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((items) => {
      return items.productId.toString() !== productId.toString();
    });
    return getDB()
      .collection("users")
      .updateOne(
        { _id: mongoDB.ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: this._id,
            name: this.name,
            email: this.email,
          },
        };
        return getDB().collection("orders").insertOne(order);
      })
      .then(() => {
        this.cart = [];
        return getDB()
          .collection("users")
          .updateOne(
            { _id: mongoDB.ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    return getDB()
      .collection("orders")
      .find({ "user._id": mongoDB.ObjectId(this._id) })
      .toArray();
  }

  static findById(_id) {
    return getDB()
      .collection("users")
      .findOne({ _id: mongoDB.ObjectId(_id) });
  }
}
module.exports = User;
