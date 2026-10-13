import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionHeading from "./component/SectionHeading";
import TodoForm from "./component/TodoForm";
import TodoFilters from "./component/TodoFilters";

function App() {
  const [filterTodos, setFilter] = useState("all");

  const [sampleTodos, setSampleTodos] = useState([
    { id: 1, description: "Learn ReactJS basics", completed: false },
    { id: 2, description: "Practice ReactJS", completed: false },
    { id: 3, description: "Learn Redux", completed: false },
    { id: 4, description: "Code portfolio in React", completed: false },
    { id: 5, description: "Learn React Native", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");

  function handleAddTodo() {
    
  }

  function handleDeleteTodo(id) {
    setSampleTodos(sampleTodos.filter((todo) => todo.id !== id));
  }

  function handleToggleComplete(id) {
    setSampleTodos(
      sampleTodos
        .map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        )
        .sort((a, b) => b.completed - a.completed),
    );
  }

  const visibleTodos = sampleTodos.filter((todo) => {
    if (filterTodos === "done") return todo.completed;
    if (filterTodos === "todo") return !todo.completed;
    return true;
  });

  return (
    <main className="mx-auto mt-[30px] w-[90%] max-w-[650px] text-[#222222]">
      
      <SectionHeading heading="TodoInput" />

      <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} sampleTodos={sampleTodos} setSampleTodos={setSampleTodos} />

      <SectionHeading heading="TodoList" />
      
      {sampleTodos.length === 0 && (
        <p className="mb-[35px] text-center text-sm text-[#999999]">
          No todo is available.
        </p>
      )}

      <TodoFilters setFilter={setFilter} sampleTodos={sampleTodos} />

      <div className="flex flex-col gap-[10px]">
        {visibleTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between gap-[10px] border border-[#dddddd] bg-white p-3 max-[480px]:p-2"
          >
            <span
              className={`min-w-0 flex-1 break-words text-sm ${todo.completed ? "line-through text-green-400" : ""}`}
            >
              {todo.description}
            </span>

            <div className="flex shrink-0 items-center gap-2 max-[480px]:gap-[5px]">
              <input
                type="checkbox"
                checked={todo.completed}
                className="accent-black"
                onChange={() => {
                  if (!todo.completed) {
                    handleToggleComplete(todo.id);
                  }
                }}
              />
              {!todo.completed && (
                <button
                  type="button"
                  className="cursor-pointer rounded bg-silver bg-[#c0c0c0] px-2 py-[6px] text-black"
                  onClick={() => {
                    handleEditTodo(todo.id);
                  }}
                >
                  <FaEdit className="w-[10px] h-[10px]" />
                </button>
              )}

              {todo.completed && (
                <button
                  type="button"
                  className="cursor-pointer rounded bg-[#dc3545] px-2 py-[6px] text-white"
                  onClick={() => {
                    handleDeleteTodo(todo.id);
                  }}
                >
                  <FaTrashAlt className="w-[10px] h-[10px]" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
