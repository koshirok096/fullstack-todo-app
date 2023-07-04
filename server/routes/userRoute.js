import express from "express";
import {
  getUser,
  updateWallpaper
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Get User
router.get("/:id", verifyToken, getUser);

// Update Wallpaper
router.put("/updateWallpaper/:id", verifyToken, updateWallpaper);

export default router;
