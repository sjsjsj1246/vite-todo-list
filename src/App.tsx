import { useState } from "react";
import TodoList from "@components/TodoList";

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

export type TabState = "All" | "Active" | "Completed";

function App() {
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

  return (
    <div className="w-screen h-screen flex-col gap-4 flex items-center bg-stone-100">
      <h1 className="font-serif font-light text-6xl mt-8 text-stone-400">
        todos
      </h1>
      <TodoList todos={todos} currentTab={currentTab} />
    </div>
  );
}

export default App;
