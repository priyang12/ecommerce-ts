import { IOrder } from "../modals/Order";

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function makeOrders(createdUsers: any[], createdProducts: any[]) {
  // Create orders for each user
  const createdOrders: Omit<IOrder, "createdAt" | "updatedAt">[] = [];

  for (const user of createdUsers) {
    const numOrders = getRandomInt(1, 2); // Each user has 1–2 orders

    for (let i = 0; i < numOrders; i++) {
      const orderedProducts = [...createdProducts]
        .sort(() => 0.5 - Math.random())
        .slice(0, getRandomInt(1, 3)); // 1–3 products per order

      const orderItems = orderedProducts.map((product) => ({
        product: {
          _id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
        },
        qty: getRandomInt(1, 3),
        Reviewed: false,
      }));

      const itemsPrice = orderItems.reduce(
        (sum, item) => sum + item.product.price * item.qty,
        0
      );
      const taxPrice = itemsPrice * 0.1;
      const shippingPrice = 5;
      const totalPrice = itemsPrice + taxPrice + shippingPrice;

      const order: Omit<IOrder, "createdAt" | "updatedAt"> = {
        user: user._id,
        orderItems,
        shippingAddress: {
          address: "123 Main Street",
          city: "Testville",
          postalcode: "12345",
        },
        paymentMethod: "PayPal",
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: new Date(),
        isDelivered: Math.random() > 0.3,
        deliveredAt: new Date(),
      };

      createdOrders.push(order);
    }
  }
  return createdOrders;
}
