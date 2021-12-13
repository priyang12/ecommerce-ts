import { render, screen, waitFor } from '@testing-library/react';
import SingleProduct from '../SingleProduct';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { AuthProvider } from '../../Context/AuthContext';
import '@testing-library/jest-dom';

const product = {
  rating: 4,
  numReviews: 1,
  price: 89.99,
  countInStock: 10,
  _id: '60d5e622e5179e2bb44bd838',
  name: 'Airpods Wireless Bluetooth Headphones',
  image: '/Photos/image-1627384388351.webp',
  description:
    'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
  brand: 'Apple',
  category: 'Electronics',
  user: '60d5e622e5179e2bb44bd835',
  reviews: [
    {
      _id: '6128b73ebc70bc35a0b0c3d0',
      name: 'Priyang',
      rating: 4,
      comment: 'very good',
      user: '6106f4c09d285d000436ed0a',
      createdAt: '2021-08-27T09:58:22.657Z',
      updatedAt: '2021-08-27T09:58:22.657Z',
    },
  ],
  Date: '2021-06-25T14:20:18.612Z',
  __v: 4,
  createdAt: '2021-06-25T14:20:18.622Z',
  updatedAt: '2021-08-27T09:58:22.658Z',
};

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

it('Mock Fetch PRoduct Details', async () => {
  const route = '/product/123123';
  const history = createMemoryHistory({ initialEntries: [route] });
  mock.onGet('/api/products/product/123123').reply(200, product);

  render(
    <AuthProvider>
      <Router history={history}>
        <Route path='/product/:id'>
          <SingleProduct />
        </Route>
      </Router>
    </AuthProvider>
  );

  await waitFor(() => screen.getByText(/Airpods Wireless Bluetooth/));
  expect(screen.getByText(/Airpods Wireless Bluetooth/)).toBeInTheDocument();
  //Check for Image
  expect(screen.getByAltText(/Airpods Wireless Bluetooth/)).toHaveAttribute(
    'src',
    product.image
  );
  //Check for Review
  expect(screen.getByText(/REVIEWS/)).toBeInTheDocument();
  expect(screen.getByText(/Priyang/)).toBeInTheDocument();
});
// it('Return null on no Reviews', () => {
//   render(<SingleProduct />);
//   mock.onGet().reply(200, product);
//   waitForElementToBeRemoved(screen.getByTestId('Loading'));
//   expect(screen.getByText(/REVIEWS/)).not.toBeInTheDocument();
// });
