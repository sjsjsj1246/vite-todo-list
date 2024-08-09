import { useEffect, useRef } from "react";
import useTodoList from "../hook";
import Footer from "./footer";
import Header from "./header";
import TodoItem from "./todo-item";

const TodoList = () => {
  const {
    state: { completedTodoExists, currentTab, filteredTodos, remainTodosAmount },
    action: { addTodo, deleteCompletedTodo, deleteTodo, editTodo, setCurrentTab, toggleTodo, toggleTodoAll },
  } = useTodoList();

  const todoLength = useRef(0);
  useEffect(() => {
    if(todoLength.current < (filteredTodos?.length ?? 0)) {
      const scrollBottom = document.getElementById("scroll-bottom");
      scrollBottom?.scrollIntoView({ behavior: "smooth" });
    }
    todoLength.current = filteredTodos?.length || 0;
  }, [filteredTodos]);

  return (
    <div className="w-[600px] max-h-[calc(100vh-200px)] flex flex-col bg-white rounded-lg drop-shadow-md">
      <Header addTodo={addTodo} toggleTodoAll={toggleTodoAll} />
      <div className="h-full overflow-y-auto">
        {filteredTodos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
        ))}
        <div id="scroll-bottom" />
      </div>
      <Footer
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        completedTodoExists={completedTodoExists}
        remainTodosAmount={remainTodosAmount}
        deleteCompletedTodo={deleteCompletedTodo}
      />
    </div>
  );
};

export default TodoList;
