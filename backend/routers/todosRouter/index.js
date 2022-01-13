import express from 'express';

import { postNewTodo } from "./postRoutes.js";
import { getAllTodos, getTodoById } from "./getRoutes.js";
import { updateTodoById } from "./putRoutes.js";
import { deleteTodoById } from "./deleteRoutes.js";

const todosRouter = new express.Router();

// POST
app.post('/todos', postNewTodo);

// GET
app.get('/todos', getAllTodos);
app.get('/todos/:id', getTodoById);

// PUT
app.put('/todos/:id', updateTodoById);

// DELETE
app.delete('/todos/:id', deleteTodoById);


export { todosRouter };