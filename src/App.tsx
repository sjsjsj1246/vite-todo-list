import TodoList from "@components/TodoList";

function App() {
  return (
    <div className="w-screen h-screen flex-col gap-4 flex items-center bg-stone-100">
      <h1 className="font-serif font-light text-6xl mt-8 text-stone-400">
        todos
      </h1>
      <TodoList />
    </div>
  );
}

export default App;
