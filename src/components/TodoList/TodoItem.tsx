import { type Todo } from "App";
import { FaRegTrashAlt, FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div className="px-4 gap-2 group flex items-center h-16 border-b-[1px] border-stone-300 shrink-0">
      {todo.completed ? (
        <button className="flex w-8 justify-center items-center">
          <FaRegCheckCircle className="w-6 h-6 text-stone-400 hover:text-stone-600" />
        </button>
      ) : (
        <button className="flex w-8 justify-center items-center">
          <FaRegCircle className="w-6 h-6 text-stone-400 hover:text-stone-600" />
        </button>
      )}
      <p
        className={`flex-1 text-lg ${
          todo.completed ? "text-stone-400 line-through" : "text-stone-600"
        }`}
      >
        {todo.content}
      </p>
      <button className="group-hover:visible invisible w-8">
        <FaRegTrashAlt className="text-red-500 w-5 h-5" />
      </button>
    </div>
  );
};

export default TodoItem;
