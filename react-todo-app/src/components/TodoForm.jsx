import { FaBook } from "react-icons/fa";
function TodoForm({ newTodo, setNewTodo, sampleTodos, setSampleTodos }) {
  return (
    <section className="mb-5 rounded border border-[#dddddd] p-[15px]">
      <div className="flex overflow-hidden rounded border border-[#cccccc]">
        <span className="flex items-center justify-center bg-[#0799a6] px-3 py-[10px]">
          <FaBook className="text-white" />
        </span>

        <input type="text" value={newTodo} onChange={(event) => setNewTodo(event.target.value)} placeholder="New Todo" className="min-w-0 flex-1 px-[10px] py-[10px] text-sm outline-none"/>
      </div>

      <button
        type="button"
        className="mt-3 w-full cursor-pointer rounded bg-[#0799a6] p-[10px] text-white"
        onClick={() => {
          if (newTodo.trim() === "") {
            alert("Please enter a todo description.");
            return;
          }
          const newToDoItem = {
            id: Math.max(0, ...sampleTodos.map((t) => t.id)) + 1,
            description: newTodo,
            completed: false,
          };
          setSampleTodos([...sampleTodos, newToDoItem]);
          setNewTodo("");
        }}
      >
        Add new task
      </button>
    </section>
  );
}

export default TodoForm;
