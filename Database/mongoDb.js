const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://srikalyan12:srikalyan12@cluster0.qztn8.mongodb.net/MAXNODEDB?retryWrites=true&w=majority"
  )
    .then((client) => {
      _db = client.db();
      console.log("connected to database");
      callback();
    })
    .catch((err) => console.log(err));
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "NO database exist";
};
module.exports = { mongoConnect, getDB };
