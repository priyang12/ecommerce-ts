import { render, screen, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AuthContext, AuthProvider } from '../../Context/AuthContext';
import ProductDetails from '../ProductDetails';

const product = {
  rating: 4,
  numReviews: 1,
  price: 89.99,
  countInStock: 10,
  _id: '60d5e622e5179e2bb44bd838',
  name: 'Airpods Wireless Bluetooth Headphones',
  image: '/Photos/image-1627384388351.webp',
  description: 'Bluetooth technology while working',
  brand: 'Apple',
  category: 'Electronics',
  user: '60d5e622e5179e2bb44bd835',
  reviews: [],
  Date: '2021-06-25T14:20:18.612Z',
  __v: 4,
  createdAt: '2021-06-25T14:20:18.622Z',
  updatedAt: '2021-08-27T09:58:22.658Z',
};

let mock: MockAdapter;
beforeEach(() => {
  const a = axios;
  mock = new MockAdapter(a);
});

afterEach(() => {
  mock.reset();
});

it('Check on Details SnapShot', () => {
  render(
    <AuthProvider>
      <ProductDetails Product={product} />
    </AuthProvider>
  );
  expect(screen.getByText(/Airpods Wireless Bluetooth/)).toBeInTheDocument();
  expect(screen.getByAltText(/Airpods Wireless Bluetooth/)).toHaveAttribute(
    'src',
    product.image
  );
});

it('Mock Add to Cart ', async () => {
  const cartResponse = {
    msg: 'Airpods Wireless Bluetooth Headphones is Added Cart',
  };
  mock.onPost('/api/cart').reply(200, cartResponse);

  const state = {
    loading: false,
    err: null,
    token: null,
    user: {
      name: 'Priyang',
      isAdmin: false,
    },
  };
  const dispatch = jest.fn();

  await act(async () => {
    render(
      <AuthContext.Provider value={{ state, dispatch }}>
        <ProductDetails Product={product} />
      </AuthContext.Provider>
    );
    userEvent.click(screen.getByText(/ADD TO CART/));
  });
  await waitFor(() => screen.getByText(/Headphones is Added Cart/));
});
