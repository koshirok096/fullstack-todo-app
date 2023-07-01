import express from "express";
import {
  getUser,
  update,
  deleteUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Update User
router.put("/:id", verifyToken, update);

// Get User
router.get("/find/:id", verifyToken, getUser);

// Delete User
router.delete("/:id", verifyToken, deleteUser);


export default router;
