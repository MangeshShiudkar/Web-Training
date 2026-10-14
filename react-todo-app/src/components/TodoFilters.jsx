function TodoFilters({ activeFilter, sampleTodos, setFilter }) {
  return (
    sampleTodos.length > 0 && (
      <div className="mb-[35px] flex gap-5 max-[480px]:gap-2">
        <button
          type="button"
          aria-pressed={activeFilter === "all"}
          className={`flex-1 cursor-pointer rounded bg-[#0799a6] p-[10px] text-white ${activeFilter === "all" ? "opacity-60" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          type="button"
          aria-pressed={activeFilter === "done"}
          className={`flex-1 cursor-pointer rounded bg-[#0799a6] p-[10px] text-white ${activeFilter === "done" ? "opacity-60" : ""}`}
          onClick={() => setFilter("done")}
        >
          Done
        </button>
        <button
          type="button"
          aria-pressed={activeFilter === "todo"}
          className={`flex-1 cursor-pointer rounded bg-[#0799a6] p-[10px] text-white ${activeFilter === "todo" ? "opacity-60" : ""}`}
          onClick={() => setFilter("todo")}
        >
          Todo
        </button>
      </div>
    )
  );
}

export default TodoFilters;