import { useState } from "react";

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

export type TabState = "All" | "Active" | "Completed";

const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      content: "Todo 1",
      completed: false,
    },
    {
      id: "2",
      content: "Todo 2",
      completed: true,
    },
    {
      id: "3",
      content: "Todo 3",
      completed: false,
    },
  ]);
  const [currentTab, setCurrentTab] = useState<TabState>("All");

  const filteredTodos = todos.filter((todo) => {
    if (currentTab === "All") {
      return true;
    } else if (currentTab === "Active") {
      return !todo.completed;
    } else if (currentTab === "Completed") {
      return todo.completed;
    }
  });

  const remainTodosAmount = todos.filter((todo) => !todo.completed).length;

  const completedTodoExists = todos.some((todo) => todo.completed);

  const addTodo = (content: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      content,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const editTodo = (id: string, content: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, content } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const deleteCompletedTodo = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleTodoAll = () => {
    const areAllCompleted = todos.every((todo) => todo.completed);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, completed: !areAllCompleted }))
    );
  };

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
