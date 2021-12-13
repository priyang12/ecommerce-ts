import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import DisplayProducts from '../DisplayProducts';
import { Product } from '../../types';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';

const Products: Product[] = [
  {
    rating: 4,
    numReviews: 1,
    price: 89.99,
    _id: '60d5e622e5179e2bb44bd838',
    name: 'Airport Wireless Bluetooth Headphones',
    image: '/Photos/image-1627384388351.webp',
  },
  {
    rating: 2.3333333333333335,
    numReviews: 3,
    price: 399.99,
    _id: '60d5e622e5179e2bb44bd839',
    name: 'iPhone 6s',
    image: '/Photos/image-1628092416984.webp',
  },
];

const data = {
  products: Products,
};

describe('Display Products', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    const a = axios;
    mock = new MockAdapter(a);
  });

  afterEach(() => {
    mock.reset();
  });
  it('Product Should Load on init', async () => {
    mock.onGet('/api/products').reply(200, data);
    render(
      <Router>
        <DisplayProducts url='/api/products' />
      </Router>
    );
    await waitForElementToBeRemoved(screen.getByText('Loading'));
    expect(screen.getByText(/iPhone/)).toBeInTheDocument();
    expect(screen.getByText(/Wireless Bluetooth/)).toBeInTheDocument();
  });
});
