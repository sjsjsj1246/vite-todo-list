import { type TabState, type Todo } from "App";
import Header from "./header";
import TodoItem from "./TodoItem";
import Footer from "./footer";

interface TodoProps {
  todos: Todo[];
  currentTab: TabState;
}

const TodoList = ({ todos, currentTab }: TodoProps) => {
  return (
    <div className="w-[600px] max-h-[calc(100vh-200px)] flex flex-col bg-white rounded-lg drop-shadow-md">
      <Header />
      <div className="h-full overflow-y-auto">
        {todos.map((todo) => (
          <>
            <TodoItem todo={todo} />
          </>
        ))}
      </div>
      <Footer todos={todos} currentTab={currentTab} />
    </div>
  );
};

export default TodoList;
