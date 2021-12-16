import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  getUserProfileById,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/byid/:id", getUserProfileById);

export default router;
