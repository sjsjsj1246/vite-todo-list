import Header from "./header";
import TodoItem from "./todo-item";
import Footer from "./footer";
import useTodoList from "./use-todo-list";

const TodoList = () => {
  const {
    state: { completedTodoExists, currentTab, filteredTodos, remainTodosAmount },
    action: { addTodo, deleteCompletedTodo, deleteTodo, editTodo, setCurrentTab, toggleTodo, toggleTodoAll },
  } = useTodoList();

  return (
    <div className="w-[600px] max-h-[calc(100vh-200px)] flex flex-col bg-white rounded-lg drop-shadow-md">
      <Header addTodo={addTodo} toggleTodoAll={toggleTodoAll} />
      <div className="h-full overflow-y-auto">
        {filteredTodos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
        ))}
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
