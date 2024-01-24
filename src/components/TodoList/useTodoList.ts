import { useEffect, useState } from "react";

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

export type TabState = "All" | "Active" | "Completed";

const useTodoList = (id: string) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTab, setCurrentTab] = useState<TabState>("All");

  useEffect(() => {
    const savedData = localStorage.getItem(`todo-list-${id}`);
    if (savedData) {
      const { todos, currentTab } = JSON.parse(savedData);
      setTodos(todos);
      setCurrentTab(currentTab);
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(
      `todo-list-${id}`,
      JSON.stringify({ todos, currentTab })
    );
  }, [todos, currentTab, id]);

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
