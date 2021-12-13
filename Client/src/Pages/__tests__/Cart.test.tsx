import { render, screen, act } from '@testing-library/react';
import Cart from '../Cart';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userEvent from '@testing-library/user-event';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

const EmptyCart = {
  _id: '616721ac6a6b1647b02c6ed9',
  cart: [],
};

const LoadUserCart = {
  _id: '616721ac6a6b1647b02c6ed9',
  cart: [
    {
      _id: '617028b4ae931d0004f7d964',
      product: {
        price: 89.99,
        countInStock: 2,
        _id: '60d5e622e5179e2bb44bd838',
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/Photos/image-1627384388351.webp',
      },
      qty: 2,
    },
    {
      _id: '61705624b54854000494b5ce',
      product: {
        price: 929.99,
        countInStock: 5,
        _id: '60d5e622e5179e2bb44bd83c',
        name: 'Logtech mouse',
        image: '/Photos/image-1627385386692.webp',
      },
      qty: 1,
    },
  ],
};

const UpdateProduct = {
  msg: 'XyZ Qty Updated in Cart',
};

const AfterDeleteCart = {
  _id: '616721ac6a6b1647b02c6ed9',
  cart: [
    {
      _id: '61705624b54854000494b5ce',
      product: {
        price: 929.99,
        countInStock: 5,
        _id: '60d5e622e5179e2bb44bd83c',
        name: 'Logtech mouse',
        image: '/Photos/image-1627385386692.webp',
      },
      qty: 1,
    },
  ],
  msg: 'XyZ is Deleted From the Cart',
};

it('Empty Cart', async () => {
  mock.onGet('/api/cart').reply(200, EmptyCart);
  await act(async () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
  });
  expect(screen.getByText('Empty Cart'));
});

it('Mock Get User Cart On Load', async () => {
  mock.onGet('/api/cart').reply(200, LoadUserCart);
  await act(async () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
  });
  expect(screen.getByText(/Bluetooth Headphones/));
  expect(screen.getByText(/Logtech mouse/));
});

it('Mock Change Cart Qty', async () => {
  mock.onGet('/api/cart').reply(200, LoadUserCart);
  mock.onPost('/api/cart').reply(200, UpdateProduct);
  await act(async () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
  });
  const QtySelects = screen.getAllByTestId('selectQty');
  await act(async () => {
    userEvent.selectOptions(QtySelects[1], '3');
  });
  expect(screen.getByText(/Updated in Cart/));
});

it('Mock Delete Product Form Cart', async () => {
  mock.onGet('/api/cart').reply(200, LoadUserCart);
  mock
    .onDelete(`/api/cart/${LoadUserCart.cart[0]._id}`)
    .reply(200, AfterDeleteCart);

  await act(async () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
  });
  const DeleteBtn = screen.getAllByTestId('DeleteIcon');
  await act(async () => {
    userEvent.click(DeleteBtn[0]);
  });
  expect(screen.getByText(/Deleted From the Cart/));
});
