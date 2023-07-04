import express from "express";
import {
  addTodo,
  getAllTodos,
  toggleTodoDone,
  updateTodo,
  deleteTodo,
} from "../controllers/task.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post('/:id', verifyToken, addTodo);
router.get('/', verifyToken, getAllTodos);
router.get('/:id', verifyToken, toggleTodoDone);
router.put('/:id', verifyToken, updateTodo);
router.delete('/:id', verifyToken, deleteTodo);

export default router;