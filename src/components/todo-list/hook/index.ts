import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as todoApi from "@libs/api/todo";
import useOptimisticMutation from "@libs/util/use-optimistic-mutation";
import { type Todo, type TabState } from "../consts";

const useTodoList = () => {
  const TODOS_QUERY_KEY = ["todos"];
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

  const { mutate: addTodo } = useOptimisticMutation<Todo[], Pick<Todo, "content">>({
    queryKey: TODOS_QUERY_KEY,
    mutationFn: ({ content }) => todoApi.addTodo(content),
    updateFn:
      ({ content }) =>
      (prev) => {
        if (prev) {
          return [
            ...prev,
            {
              id: String(Date.now()),
              content,
              completed: false,
            },
          ];
        }
        return [];
      },
  });

  const { mutate: editTodo } = useOptimisticMutation<Todo[], Pick<Todo, "id" | "content">>({
    queryKey: TODOS_QUERY_KEY,
    mutationFn: ({ id, content }) => todoApi.editTodo(id, content),
    updateFn:
      ({ id, content }) =>
      (prev) => {
        const index = prev!.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          prev![index].content = content;
        }
        return prev;
      },
  });

  const { mutate: deleteTodo } = useOptimisticMutation<Todo[], Pick<Todo, "id">>({
    queryKey: TODOS_QUERY_KEY,
    mutationFn: ({ id }) => todoApi.deleteTodo(id),
    updateFn:
      ({ id }) =>
      (prev) =>
        prev?.filter((todo) => todo.id !== id),
  });

  const { mutate: deleteCompletedTodo } = useOptimisticMutation<Todo[]>({
    queryKey: TODOS_QUERY_KEY,
    mutationFn: () => {
      if (!todos) return Promise.reject();

      return Promise.all(todos.filter((todo) => todo.completed).map((todo) => todoApi.deleteTodo(todo.id)));
    },
    updateFn: () => (prev) => prev?.filter((todo) => !todo.completed),
  });

  const { mutate: toggleTodo } = useOptimisticMutation<Todo[], Pick<Todo, "id">>({
    queryKey: TODOS_QUERY_KEY,
    mutationFn: ({ id }) => todoApi.toggleTodo(id),
    updateFn:
      ({ id }) =>
      (prev) =>
        prev?.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
  });

  const { mutate: toggleTodoAll } = useOptimisticMutation<Todo[]>({
    queryKey: TODOS_QUERY_KEY,
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
    updateFn: () => (prev) => {
      if (prev) {
        const areAllCompleted = prev.every((todo) => todo.completed);
        return prev.map((todo) => ({
          ...todo,
          completed: !areAllCompleted,
        }));
      }
      return [];
    },
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
