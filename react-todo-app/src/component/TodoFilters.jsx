import React from 'react'

const TodoFilters = (props) => {
  return (
    props.sampleTodos.length > 0 && (
      <div className="mb-[35px] flex gap-5 max-[480px]:gap-2">
        <button
          key="All"
          type="button"
          className="flex-1 cursor-pointer rounded bg-[#0799a6] p-[10px] text-white"
          onClick={() => {
            props.setFilter("all");
          }}
        >
          All
        </button>
        <button
          key="Done"
          type="button"
          className="flex-1 cursor-pointer rounded bg-[#0799a6] p-[10px] text-white"
          onClick={() => {
            props.setFilter("done");
          }}
        >
          Done
        </button>
        <button
          key="Todo"
          type="button"
          className="flex-1 cursor-pointer rounded bg-[#0799a6] p-[10px] text-white"
          onClick={() => {
            props.setFilter("todo");
          }}
        >
          Todo
        </button>
      </div>
    )
  )
}

export default TodoFilters