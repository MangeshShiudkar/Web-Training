import React from "react";

const TodoForm = (props) => {
  return (
    <section className="mb-5 rounded border border-[#dddddd] p-[15px]">
      <div className="flex overflow-hidden rounded border border-[#cccccc]">
        <span className="bg-[#0799a6] px-3 py-[10px]"></span>

        <input
          type="text"
          value={props.newTodo}
          onChange={(e) => props.setNewTodo(e.target.value)}
          placeholder="New Todo"
          className="min-w-0 flex-1 px-[10px] py-[10px] text-sm outline-none"
        />
      </div>

      <button
        type="button"
        className="mt-3 w-full cursor-pointer rounded bg-[#0799a6] p-[10px] text-white"
        onClick={() => {
          if (props.newTodo.trim() === "") {
            alert("Please enter a todo description.");
            return;
          }
          const newToDoItem = {
            id: props.sampleTodos.length + 1,
            description: props.newTodo,
            completed: false,
          };
          props.setSampleTodos([...props.sampleTodos, newToDoItem]);
          props.setNewTodo("");
        }}
      >
        Add new task
      </button>
    </section>
  );
};

export default TodoForm;
