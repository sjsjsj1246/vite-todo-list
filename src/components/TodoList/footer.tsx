import { type TabState, type Todo } from "App";

interface FooterProps {
  todos: Todo[];
  currentTab: TabState;
}

const Footer = ({ todos, currentTab }: FooterProps) => {
  return (
    <div className="flex px-4 items-center h-12 justify-center shrink-0 border-t-[1px] border-stone-300">
      <p className="absolute left-4 text-sm text-stone-500">
        {todos.filter((todo) => !todo.completed).length} item left
      </p>
      <div className="flex gap-4">
        {(["All", "Active", "Completed"] as TabState[]).map((tab) => (
          <button
            key={tab}
            className={`p-1 text-lg hover:text-stone-600 ${
              currentTab === tab
                ? "outline outline-1 outline-stone-300 text-stone-600"
                : "text-stone-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {todos.some((todo) => todo.completed) && (
        <button className="absolute right-4 text-stone-400 hover:text-stone-600">
          Clear completed
        </button>
      )}
    </div>
  );
};

export default Footer;
