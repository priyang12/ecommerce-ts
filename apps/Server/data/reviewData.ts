import { IReview } from "../modals/Review";

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const reviewComments = [
  "Amazing product!",
  "Decent, but has some flaws.",
  "Not what I expected.",
  "Excellent value for money!",
  "Will buy again.",
  "Average experience.",
  "High quality, fast shipping.",
];

export function createReviews(createdOrders: any[]) {
  const sampleReviews: Omit<IReview, "createdAt" | "updatedAt">[] = [];

  for (const order of createdOrders) {
    const userId = order.user;

    const itemsToReview = [...order.orderItems]
      .sort(() => 0.5 - Math.random())
      .slice(0, getRandomInt(1, Math.min(order.orderItems.length, 2)));

    for (const item of itemsToReview) {
      sampleReviews.push({
        user: userId,
        order: order._id,
        product: item.product._id,
        rating: getRandomInt(3, 5),
        comment: reviewComments[getRandomInt(0, reviewComments.length - 1)],
        approved: Math.random() > 0.3,
      });
    }
  }

  return sampleReviews;
}
