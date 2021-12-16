import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  addTableReservation,
  getTables,
  getTableById,
  getTablesAll,
  removeTableReservation,
} from "../controllers/tableController.js";

router.route("/").get(getTables);
router.route("/").put(protect, addTableReservation);
router.route("/all/").get(getTablesAll);
router.route("/remove/:id").put(removeTableReservation);
router.route("/:id").get(getTableById);

// router.route("/:id").get(getProductById);

export default router;
