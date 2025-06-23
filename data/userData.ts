export const AdminUser = {
  name: "Admin User",
  email: "admin@example.com",
  password: "123456",
  isAdmin: true,
};

const users = [
  AdminUser,
  {
    name: "John Doe",
    email: "john@example.com",
    password: "123456",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: "123456",
  },
];

export const TestUser = {
  name: "Test User",
  email: "Test@example.com",
  password: "123456",
};

export default users;
