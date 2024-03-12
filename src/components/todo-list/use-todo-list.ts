import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as todoApi from "@libs/api/todo";

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

export type TabState = "All" | "Active" | "Completed";

const useTodoList = () => {
  const quertClient = useQueryClient();
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: todoApi.getTodos,
  });
  const [currentTab, setCurrentTab] = useState<TabState>("All");

  const filteredTodos = todos?.filter((todo) => {
    if (currentTab === "All") {
      return true;
    } else if (currentTab === "Active") {
      return !todo.completed;
    } else if (currentTab === "Completed") {
      return todo.completed;
    }
  });

  const remainTodosAmount = todos?.filter((todo) => !todo.completed).length;

  const completedTodoExists = todos?.some((todo) => todo.completed);

  const { mutate: addTodo } = useMutation({
    mutationFn: ({ content }: Pick<Todo, "content">) => todoApi.addTodo(content),
    onSuccess: () => quertClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const { mutate: editTodo } = useMutation({
    mutationFn: ({ id, content }: Pick<Todo, "id" | "content">) => todoApi.editTodo(id, content),
    onSuccess: () => quertClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: ({ id }: Pick<Todo, "id">) => todoApi.deleteTodo(id),
    onSuccess: () => quertClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const { mutate: deleteCompletedTodo } = useMutation({
    mutationFn: () => {
      if (!todos) return Promise.reject();

      return Promise.all(todos.filter((todo) => todo.completed).map((todo) => todoApi.deleteTodo(todo.id)));
    },
    onSuccess: () => quertClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const { mutate: toggleTodo } = useMutation({
    mutationFn: ({ id }: Pick<Todo, "id">) => todoApi.toggleTodo(id),
    onSuccess: () => quertClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const { mutate: toggleTodoAll } = useMutation({
    mutationFn: () => {
      if (!todos) return Promise.reject();

      const areAllCompleted = todos.every((todo) => todo.completed);

      return Promise.all(
        todos.map((todo) => {
          if (areAllCompleted) todoApi.toggleTodo(todo.id);
          else if (!todo.completed) todoApi.toggleTodo(todo.id);
        })
      );
    },
    onSuccess: () => quertClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return {
    state: {
      todos,
      currentTab,
      filteredTodos,
      remainTodosAmount,
      completedTodoExists,
    },
    action: {
      addTodo,
      editTodo,
      deleteTodo,
      deleteCompletedTodo,
      toggleTodo,
      toggleTodoAll,
      setCurrentTab,
    },
  };
};

export default useTodoList;
