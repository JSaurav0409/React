import { useState } from "react";
import { useTodo } from "../context/todoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleTodo } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleTodo(todo.id);
  };

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-lg px-4 py-3 gap-x-4 shadow-md transition duration-300 ease-in-out ${
        todo.completed
          ? "bg-green-100 text-green-800"
          : "bg-purple-100 text-purple-800"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer h-5 w-5 text-green-500 focus:ring-0 focus:outline-none"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border-0 outline-none w-full bg-transparent text-lg ${
          todo.completed ? "line-through text-gray-500" : "text-gray-800"
        } ${
          isTodoEditable
            ? "bg-purple-100 shadow-inner rounded-md px-2 py-1"
            : ""
        }`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-gray-500 hover:text-gray-800 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shadow-sm justify-center items-center"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-red-500 hover:text-red-700 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shadow-sm justify-center items-center"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
