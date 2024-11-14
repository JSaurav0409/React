import { useState, useEffect } from 'react'
import './App.css'
import { TodoProvider } from './context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  const [todos, setTodos] = useState([])

  //? Adding functionalities

  //* Adding new Todo ( todo )
  const addTodo = (todo) => {  
    setTodos ( (prev) => [{...todo}, ...prev] );
  }

  //* Updating the selected Todo ( id, todo )
  const updateTodo = (id, todo) => {
  setTodos((prev) => {
    return prev.map((eachValue) => {
      // Check if the current item's ID matches the one we're looking for
      if (eachValue.id === id) {
        return todo; // Replace the todo if IDs match
      } else {
        return eachValue; // Keep the current todo if IDs don't match
      }
    });
  });
  };
  
  //? Another way to write updateTodoCode
  /*
  const updateTodo = (id, todo) => {
    setTodos( (prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
    }
  */

  //* Deleting the selected Todo ( id )
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id ))
  }

  //* Checked the selected TODO
  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))  
  }


  //! Local Storage part

  // getting the items
  
  useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  // setting the items

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])
  


return (
<TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleTodo}}>
  <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
      <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          {/* Todo form goes here */} 
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {todos.map((todo) => (
          // We are using key={todo.id} to uniquely identify each todo item in the list.
          // This helps React efficiently update and re-render only the necessary elements in the list.
            <div key={todo.id}
            className='w-full'
            > 
            <TodoItem todo={todo}/>
            </div>
          ))}
        </div>
    </div>
  </div>
</TodoProvider>
)
}

export default App
