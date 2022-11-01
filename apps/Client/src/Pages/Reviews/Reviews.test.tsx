import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter } from "react-router-dom";
import { UserReviews } from "../../FakeData/ReviewData.json";
import Reviews from "./Reviews";
import { Wrapper } from "../../TestSetup";
import { format, parseISO } from "date-fns";

const mock = new MockAdapter(axios);
const SetUp = () =>
  render(
    <Wrapper>
      <BrowserRouter>
        <Reviews />
      </BrowserRouter>
    </Wrapper>
  );

it("Render Reviews", async () => {
  mock
    .onGet(
      `/api/reviews?productSelect=name,price,image,brand,numReviews&orderSelect=itemsPrice,totalPrice,paymentMethod,deliveredAt,createdAt`
    )
    .reply(201, UserReviews);

  SetUp();
  await waitFor(() => screen.getByText("Reviews"));

  UserReviews.map((item) => {
    // Order
    expect(screen.getByText(item.order.itemsPrice)).toBeInTheDocument();
    expect(screen.getByText(item.order.totalPrice)).toBeInTheDocument();
    expect(
      screen.getAllByText(item.order.paymentMethod)[0]
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        format(parseISO(item.order.createdAt as string), "dd-MM-yyyy'")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        format(parseISO(item.order.deliveredAt as string), "dd-MM-yyyy'")
      )
    ).toBeInTheDocument();

    // Product
    expect(screen.getByText(item.product.name)).toBeInTheDocument();
    const ProductImage = screen.getByAltText(item.product.name) as any;
    expect(ProductImage.src).toMatch(item.product.image);

    // Review

    expect(screen.getByText(item.comment)).toBeInTheDocument();
    expect(
      screen.getByText(`Given Rating :${item.rating}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(format(parseISO(item.createdAt), "yyyy-MM-dd' 'HH:mm"))
    ).toBeInTheDocument();
  });
});
