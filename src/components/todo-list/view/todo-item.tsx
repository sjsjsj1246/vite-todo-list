import { memo, useState } from "react";
import { FaRegTrashAlt, FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { type Todo } from "../consts";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: ({ id }: Pick<Todo, "id">) => void;
  editTodo: ({ id, content }: Pick<Todo, "id" | "content">) => void;
  deleteTodo: ({ id }: Pick<Todo, "id">) => void;
}

const TodoItem = ({ todo, deleteTodo, editTodo, toggleTodo }: TodoItemProps) => {
  const [editMode, setEditMode] = useState(false);

  const handleDoubleClick = () => {
    setEditMode(!editMode);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing) return;
      const target = e.currentTarget;
      const content = target.value.trim();
      if (content) {
        editTodo({ id: todo.id, content });
        target.value = "";
      }
      setEditMode(false);
    }
  };

  const handleClickDeleteButton = () => {
    deleteTodo({ id: todo.id });
  };

  const handleClickToggleButton = () => {
    toggleTodo({ id: todo.id });
  };

  return (
    <div className="px-4 gap-2 group flex items-center h-16 border-b-[1px] border-stone-300 shrink-0" onDoubleClick={handleDoubleClick}>
      {todo.completed ? (
        <button className="flex w-8 justify-center items-center" onClick={handleClickToggleButton}>
          <FaRegCheckCircle className="w-6 h-6 text-stone-400 hover:text-stone-600" />
        </button>
      ) : (
        <button className="flex w-8 justify-center items-center" onClick={handleClickToggleButton}>
          <FaRegCircle className="w-6 h-6 text-stone-400 hover:text-stone-600" />
        </button>
      )}
      {editMode ? (
        <input
          className={`flex-1 text-lg ${todo.completed ? "text-stone-400 line-through" : "text-stone-600"}`}
          defaultValue={todo.content}
          onKeyDown={handleKeydown}
          autoFocus
        />
      ) : (
        <p className={`flex-1 text-lg ${todo.completed ? "text-stone-400 line-through" : "text-stone-600"}`}>{todo.content}</p>
      )}

      <button className="group-hover:visible invisible w-8" onClick={handleClickDeleteButton}>
        <FaRegTrashAlt className="text-red-500 w-5 h-5" />
      </button>
    </div>
  );
};

export default memo(TodoItem);
