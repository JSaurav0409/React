import { useState } from 'react';
import { useTodo } from '../context/todoContext';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        if (!todo) return;

        addTodo({ id: Date.now(), todo: todo, completed: false });
        setTodo("");
    };

    return (
        <form onSubmit={add} className="flex shadow-md rounded-lg overflow-hidden">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-gray-300 text-gray-800 rounded-l-lg px-4 py-4 bg-white shadow-sm focus:shadow-lg transition duration-150 ease-in-out"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button
                type="submit"
                className="rounded-r-lg px-4 py-2 bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200 shadow-sm hover:shadow-lg"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;
