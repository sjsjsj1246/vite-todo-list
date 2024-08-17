import { http } from "msw";
import { todos } from "./data";
import TodoService from "./service";

export const todoHandlers = ({ delayAmount }: { delayAmount?: number }) => {
  const service = new TodoService({ todos, delayAmount });

  return [
    http.get("/todo", service.getTodos),
    http.post("/todo", service.addTodo),
    http.get("/todo/:id", service.getTodo),
    http.patch("/todo/:id", service.editTodo),
    http.patch("/todo/:id/toggle", service.toggleTodo),
    http.delete("/todo/:id", service.deleteTodo),
  ];
};
