import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function TodoItem({ todo, onToggleComplete, onDeleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftDescription, setDraftDescription] = useState(todo.description);

  function cancelEdit() {
    setDraftDescription(todo.description);
    setIsEditing(false);
  }

  function confirmEdit() {
    if (draftDescription.trim() === "") return;
    onUpdateTodo(todo.id, draftDescription);
    setIsEditing(false);
  }

  return (
    <div className="flex items-center justify-between gap-[10px] border border-[#dddddd] bg-white p-3 max-[480px]:p-2">
      {isEditing ? (
        <input
          type="text"
          aria-label={`Edit ${todo.description}`}
          value={draftDescription}
          onChange={(event) => setDraftDescription(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") confirmEdit();
            if (event.key === "Escape") cancelEdit();
          }}
          autoFocus
          className="min-w-0 flex-1 rounded border border-[#cccccc] px-[10px] py-2 text-sm outline-none focus:border-[#0799a6]"
        />
      ) : (
        <span className={`min-w-0 flex-1 break-words text-sm ${todo.completed ? "line-through text-green-400" : ""}`}>
          {todo.description}
        </span>
      )}

      <div className="flex shrink-0 items-center gap-2 max-[480px]:gap-[5px]">
        {!isEditing && (
          <input
            type="checkbox"
            checked={todo.completed}
            className="accent-black"
            onChange={() => {
              if (!todo.completed) {
                onToggleComplete(todo.id);
              }
            }}
          />
        )}
        {!isEditing && !todo.completed && (
          <button
            type="button"
            className="cursor-pointer rounded bg-silver bg-[#c0c0c0] px-2 py-[6px] text-black"
            aria-label={`Edit ${todo.description}`}
            onClick={() => {
              setDraftDescription(todo.description);
              setIsEditing(true);
            }}
          >
            <FaEdit className="h-[10px] w-[10px]" />
          </button>
        )}

        {!isEditing && todo.completed && (
          <button
            type="button"
            className="cursor-pointer rounded bg-[#dc3545] px-2 py-[6px] text-white"
            aria-label={`Delete ${todo.description}`}
            onClick={() => onDeleteTodo(todo)}
          >
            <FaTrashAlt className="h-[10px] w-[10px]" />
          </button>
        )}

        {isEditing && (
          <>
            <button
              type="button"
              onClick={cancelEdit}
              className="cursor-pointer rounded border border-[#cccccc] px-3 py-2 text-sm text-[#333333] hover:bg-[#f5f5f5]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmEdit}
              disabled={draftDescription.trim() === ""}
              className="cursor-pointer rounded bg-[#0799a6] px-3 py-2 text-sm text-white hover:bg-[#067d87] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirm
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;