import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import data from "./data/data.js";
import tables from "./data/tables.js";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import Table from "./models/tableModel.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Table.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = data.map((product) => {
      return { ...product, user: adminUser };
    });
    const sampleTables = tables.map((table) => {
      return { ...table, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    await Table.insertMany(sampleTables);

    console.log("data imported");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Table.deleteMany();
    console.log("data destroyed");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
