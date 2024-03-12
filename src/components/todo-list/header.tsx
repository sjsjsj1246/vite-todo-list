import { FaCheck } from "react-icons/fa";
import { type Todo } from "./use-todo-list";

interface HeaderProps {
  addTodo: ({ content }: Pick<Todo, "content">) => void;
  toggleTodoAll: () => void;
}

const Header = ({ addTodo, toggleTodoAll }: HeaderProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing) return;
      const target = e.currentTarget;
      const content = target.value.trim();
      if (content) {
        addTodo({ content });
        target.value = "";
      }
    }
  };

  return (
    <div className="flex gap-2 items-stretch px-4 h-16 focus-within:outline focus-within:outline-2 focus-within:outline-blue-300 border-b-2 border-stone-300 shrink-0">
      <button
        className="w-8 flex items-center justify-center hover:text-stone-600 text-stone-400"
        onClick={toggleTodoAll}
      >
        <FaCheck />
      </button>
      <input
        type="text"
        className="flex-1 focus:outline-none text-lg placeholder:italic"
        placeholder="What needs to be done?"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Header;
