const User = require("../modals/User");
const Product = require("../modals/Product");
const Order = require("../modals/order");
const Cart = require("../modals/Cart");
const Wishlist = require("../modals/Wishlist");

const models = {
  User,
  Product,
  Order,
  Cart,
  Wishlist,
};

// explicitly create each collection
// for Mongoose multi-document write support which is needed for transactions
function CreateModels() {
  Object.keys(models).forEach((modelName) => {
    const model = models[modelName];
    model.createCollection();
  });
}

module.exports = { CreateModels, models };
