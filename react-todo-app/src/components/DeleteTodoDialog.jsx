import { useEffect, useRef } from "react";

function DeleteTodoDialog({ todo, onCancel, onConfirm }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog?.open) {
        dialog.close();
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-[420px] rounded-md border border-[#dddddd] p-0 text-[#222222] shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <h2 id="delete-dialog-title" className="text-lg font-semibold">
          Delete this task?
        </h2>
        <p id="delete-dialog-description" className="mt-2 text-sm text-[#555555]">
          Are you sure you want to delete this todo?
        </p>
        <p className="mt-3 break-words rounded bg-[#f5f5f5] p-3 text-sm font-medium">
          {todo.description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
            className="cursor-pointer rounded border border-[#cccccc] px-4 py-2 text-sm font-medium hover:bg-[#f5f5f5]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:bg-[#bb2d3b]"
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DeleteTodoDialog;