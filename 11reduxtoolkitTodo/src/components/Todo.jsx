import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../feature/todo/todoSlice";
import { FaEdit, FaSave, FaTrashAlt } from "react-icons/fa"; // Import icons

function Todos() {
  // Access todos from the Redux store
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // State for editing functionality
  const [editingTodo, setEditingTodo] = useState(null); // Store the todo being edited
  const [newText, setNewText] = useState(""); // Store the updated text

  // Handle the start of editing
  const handleEditClick = (todo) => {
    setEditingTodo(todo); // Set the todo to edit
    setNewText(todo.text); // Set the text to the current todo text
  };

  // Handle saving the updated todo
  const handleSaveClick = () => {
    if (newText.trim()) {
      // Dispatch the updateTodo action
      dispatch(updateTodo({ id: editingTodo.id, text: newText }));
      setEditingTodo(null); // Reset editing state
      setNewText(""); // Clear the input field
    }
  };

  return (
    <ul className="list-none">
      {todos.map((todo) => (
        <li
          className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
          key={todo.id}
        >
          {/* If the todo is being edited, show an input field */}
          <div className="flex items-center">
            {editingTodo?.id === todo.id ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)} // Update new text on input change
                className="bg-zinc-700 text-white py-1 px-3 rounded-md"
                placeholder="Edit todo..."
              />
            ) : (
              <span className="text-white">{todo.text}</span>
            )}
          </div>

          {/* Buttons for Edit, Save, and Delete */}
          <div className="flex items-center">
            {editingTodo?.id === todo.id ? (
              <button
                onClick={handleSaveClick}
                className="ml-2 text-white bg-green-500 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
              >
                <FaSave className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(todo)} // Start editing
                className="ml-2 text-white bg-blue-500 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
              >
                <FaEdit className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => dispatch(removeTodo(todo.id))} // Dispatch removeTodo action
              className="ml-2 text-white bg-red-500 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              <FaTrashAlt className="w-5 h-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Todos;
