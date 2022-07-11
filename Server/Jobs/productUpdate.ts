// @ts-nocheck
import agenda from "../config/agenda";
import sgMail from "@sendgrid/mail";
import Product from "../modals/Product";
import Cart from "../modals/Cart";

function productUpdate() {
  // Place Order
  agenda.define("place order", { priority: "low" }, async (job, done) => {
    const { order, email } = job.attrs.data;

    const mail = {
      to: `${email}`,
      from: "patelpriyang95@gmail.com",
      subject: "Order Confirmation",
      text: "Thank you for your order",
      html: `
        <h1>Thank you for your order</h1>
        <p>Your order has been placed successfully</p>
        <p>Order ID: ${order._id}</p>
        <p>Shipping Address: ${order.shippingAddress}</p>
        <p>Payment Method: ${order.paymentMethod}</p>
        <p>Items Price: ${order.itemsPrice}</p>
        <p>Tax Price: ${order.taxPrice}</p>
        <p>Shipping Price: ${order.shippingPrice}</p>
        <p>Total Price: ${order.totalPrice}</p>
        `,
    };

    await sgMail.send(mail);
    done();
  });

  // update Product
  agenda.define("update product", { priority: "high" }, async (job, done) => {
    const { order } = job.attrs.data;
    const { orderItems } = order;
    const productIds = orderItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    products.forEach((product) => {
      const productIndex = orderItems.indexOf(product._id);
      if (product.quantity - orderItems[productIndex].quantity < 0) {
        agenda.cancel({ name: "place order" }, (err) => {
          if (err) {
            console.log(err);
          }
        });
        throw new Error("Product out of stock");
      }
      product.quantity -= orderItems[productIndex].quantity;

      product.save();
    });
    products.save();
    done();
  });

  agenda.define("remove out of stock from cart", async (job, done) => {
    const { orderItems } = job.attrs.data;
    const productIds = orderItems.map((item) => item.product);
    const Carts = await Cart.find({ products: { $in: productIds } });
    Carts.forEach((cart) => {
      const productIndex = orderItems.indexOf(cart.products);
      cart.products.splice(productIndex, 1);
      cart.save();
    });
  });
}
export default productUpdate;
