import brcypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: brcypt.hashSync("123456", 10),
    isAdmin: true,
    address: "na",
    phone: "000000001",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: brcypt.hashSync("123456", 10),
    address: "na",
    phone: "000000001",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: brcypt.hashSync("123456", 10),
    address: "na",
    phone: "000000001",
  },
];

export default users;
