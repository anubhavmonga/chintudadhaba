import express from "express";
const router = express.Router();
import {
  getProductById,
  getProductByFilter,
  getProducts,
  addProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

router.route("/").get(getProducts);
router.route("/").post(addProduct);

router.route("/filter/").get(getProductByFilter);

router.route("/:id").get(getProductById);
router.route("/:id").delete(deleteProduct);

export default router;
