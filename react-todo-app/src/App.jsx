import { useState } from "react";
import "./App.css";
import SectionHeading from "./components/SectionHeading";
import TodoForm from "./components/TodoForm";
import TodoFilters from "./components/TodoFilters";
import TodoList from "./components/TodoList";
import DeleteTodoDialog from "./components/DeleteTodoDialog";

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
  const [todoToDelete, setTodoToDelete] = useState(null);

  function handleDeleteTodo(todo) {
    setTodoToDelete(todo);
  }

  function handleUpdateTodo(id, description) {
    setSampleTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, description } : todo,
      ),
    );
  }

  function confirmDeleteTodo() {
    setSampleTodos((todos) =>
      todos.filter((todo) => todo.id !== todoToDelete.id),
    );
    setTodoToDelete(null);
  }

  function handleToggleComplete(id) {
    setSampleTodos(
      sampleTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ).sort((a, b) => b.completed - a.completed),
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
      <TodoFilters activeFilter={filterTodos} setFilter={setFilter} sampleTodos={sampleTodos} />
      {visibleTodos.length === 0 && (
        <p className="mb-[35px] text-center text-sm text-[#999999]">
          No todo is available.
        </p>
      )}
      <TodoList todos={visibleTodos} onToggleComplete={handleToggleComplete} onDeleteTodo={handleDeleteTodo} onUpdateTodo={handleUpdateTodo}/>
      {todoToDelete && (
        <DeleteTodoDialog todo={todoToDelete} onCancel={() => setTodoToDelete(null)} onConfirm={confirmDeleteTodo}/>
      )}
    </main>
  );
}

export default App;
