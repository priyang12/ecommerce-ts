import User from "../modals/User";
import Product from "../modals/Product";
import Order from "../modals/Order";
import Cart from "../modals/Cart";
import Wishlist from "../modals/Wishlist";

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

export { CreateModels, models };
