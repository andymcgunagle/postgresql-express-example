import express from "express";

const router = express.Router();

// /api/todos
router.use('/todos', todosRouter);

export default router;