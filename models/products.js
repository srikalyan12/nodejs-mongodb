const { getDB } = require("../Database/mongoDb");
const mongoDB = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl, _id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = _id ? mongoDB.ObjectId(_id) : null;
    this.userId = userId;
  }

  save() {
    if (this._id) {
      return getDB()
        .collection("products")
        .updateOne({ _id: mongoDB.ObjectId(this._id) }, { $set: this })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      return getDB()
        .collection("products")
        .insertOne(this)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }

  static fetchAll() {
    return getDB()
      .collection("products")
      .find()
      .toArray()
      .then((products) => products)
      .catch((err) => console.log(err));
  }

  static findById(id) {
    return getDB()
      .collection("products")
      .find({ _id: mongoDB.ObjectId(id) })
      .next()
      .then((product) => product)
      .catch((err) => console.log(err));
  }

  static delateById(id) {
    return getDB()
      .collection("products")
      .deleteOne({ _id: mongoDB.ObjectId(id) })
      .then((product) => {})
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
