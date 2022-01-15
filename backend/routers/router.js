import express from "express";
import { todosRouter } from "./todosRouter/index.js";

const router = express.Router();

// /api/todos
router.use('/todos', todosRouter);

export default router;