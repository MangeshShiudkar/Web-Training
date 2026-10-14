import TodoItem from "./TodoItem";

function TodoList({ todos, onToggleComplete, onDeleteTodo, onUpdateTodo }) {
  return (
    <div className="flex flex-col gap-[10px]">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggleComplete={onToggleComplete} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo}/>
      ))}
    </div>
  );
}

export default TodoList;