import mongoose from "mongoose";

const tableSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reservedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reservedByName: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    reservedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const Table = mongoose.model("Table", tableSchema);

export default Table;
