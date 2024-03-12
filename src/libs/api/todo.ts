import { type Todo } from "@components/todo-list/use-todo-list";
import axios from "axios";

export const getTodos = async () => (await axios.get<Todo[]>("/todo")).data;
export const getTodo = async (id: string) => (await axios.get<Todo>(`/todo/${id}`)).data;
export const addTodo = async (content: string) => (await axios.post<Todo>("/todo", { content })).data;
export const editTodo = async (id: string, content: string) => (await axios.patch<Todo>(`/todo/${id}`, { content })).data;
export const toggleTodo = async (id: string) => (await axios.patch<Todo>(`/todo/${id}/toggle`)).data;
export const deleteTodo = async (id: string) => (await axios.delete<undefined>(`/todo/${id}`)).data;
