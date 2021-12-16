import asyncHandler from "express-async-handler";
import Table from "../models/tableModel.js";

// @desc Fetch ALl non reserved tables
// @route GET /api/data/
// @access Public
const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find({ reservedBy: null });
  res.json(tables);
});
// @desc Fetch ALl tables
// @route GET /api/data/
// @access Public
const getTablesAll = asyncHandler(async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(400);
    throw Error(error);
  }
});

const getTableById = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (table) {
    res.json(table);
  } else {
    res.status(404).json({ message: "Table Not Found" });
  }
});

// @desc create new order
// @route PUT /api/tables/
// @access Private
const addTableReservation = asyncHandler(async (req, res) => {
  const { name, userName } = req.body;
  const table = await Table.find({ name: name });
  const data = { ...table };
  if (data[0] && data[0].reservedBy === null) {
    data[0].reservedBy = req.user._id;
    data[0].reservedDate = new Date();
    data[0].reservedByName = userName;
    const reservedTable = await data[0].save();
    res.status(200).json(reservedTable);
  } else {
    res.status(401);
    throw new Error("Table not found");
  }
});

// @desc Remove order
// @route PUT /api/tables/
// @access Private
const removeTableReservation = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (table && table.reservedBy !== null) {
    table.reservedBy = null;
    table.reservedByName = null;
    table.reservedDate = new Date();
    const reservedTable = await table.save();
    res.status(200).json(reservedTable);
  } else {
    res.status(401);
    throw new Error("Table not found");
  }
});

export {
  getTables,
  addTableReservation,
  getTableById,
  getTablesAll,
  removeTableReservation,
};
