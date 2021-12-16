import express from "express";
import env from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";
import morgan from "morgan";

env.config();
connectDB();

const app = express();

app.use(express.json());

const path = require("path");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/data/", productRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/tables/", tableRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// process.on("uncaughtException", () => console.log("hello"));
// process.on("SIGTERM", () => console.log("hello"));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
const PORT = process.env.PORT;
app.listen(PORT || 5000, () => console.log(`listening on port ${PORT}....`));
