import { http } from "msw";
import * as service from "./service";

export const todoHandlers = [
  http.get("/todo", service.getTodos),
  http.post("/todo", service.addTodo),
  http.get("/todo/:id", service.getTodo),
  http.patch("/todo/:id", service.editTodo),
  http.patch("/todo/:id/toggle", service.toggleTodo),
  http.delete("/todo/:id", service.deleteTodo),
];
