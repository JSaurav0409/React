# Todo's using Context API and Local Storage

### **Functionality in this TODO**: 
- ***Add new task***
- ***Task Completion Toggle (Need unique id for this)***
- ***Edit task (Need unique id for this)***
- ***Delete task (Need unique id for this)*** 

# **Steps for Todo using Context API and Local Storage**

## 1. CONTEXT API PART

### **Step 1: Create Context**

#### **Step 1.1. Create the Context:**

- `TodoContext` is created using `createContext()`. 
- This initializes a context object that contains the default structure for the To-Do data and functions.

#### **Step 1.2.  Initial State:**

- The `todo's` array holds to-do items. Each item is represented by an object with an `id`, `todo` (the task description), and `completed` status. 
- For example, `[{ id: 1, todo: "Todo 1", completed: false }]` is a sample task.

#### **Step 1.3. Functions:**
- The context object also includes placeholders for key functions that manage the to-do list:
    - `addTodo(todo)`: Adds a new task.
    - `updateTodo(id, todo)`: Edits an existing task based on its `id`.
    - `deleteTodo(id)`: Removes a task by its `id`.
    - `toggleTodo(id)`: Toggles the completion status of a task by its `id`.

```javascript

// todoContext.js

import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [ // Properties
        {
            id: 1,
            todo: "Todo 1",
            completed: false,
        }
    ],
    addTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggleTodo: (id) => { },

})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.provider

```

#### **Step 1.4. Exporting the Provider and Custom Hook:**
- To make the to-do functionality accessible throughout the app, export `TodoProvider` and useTodo from index.js. This setup allows any component wrapped in `TodoProvider` to access the to-do list data and functions (such as adding, updating, and deleting tasks) using the `useTodo` hook, without needing direct access to `TodoContext`.

- **CODE**

```javascript
// index.js 

export { TodoContext, TodoProvider, useTodo } from './todoContext'

```
## 2. WRAP `TODOPROVIDER` IN APPLICATION ROOT.

### **Step 2: Set Up `TodoProvider` in the Application Root**
Now that `TodoProvider` and `useTodo` are set up, the next step is to wrap the entire app (or the main component tree that needs access to the to-do context) in `TodoProvider` to provide global access to the context.

#### **Step 2.1. Wrap Application with `TodoProvider`:**
- Import `TodoProvider` from `todoContext.js` and wrap your app's root component.

```js
// App.jsx
return (
<TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleTodo}}>
  <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
      <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          {/* Todo form goes here */} 
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
        </div>
    </div>
  </div>
</TodoProvider>
)
```

- Define functionality of `addTodo`, `updateTodo`, `deleteTodo`, `toggleTodo`.

```js

import { useState } from 'react'
import './App.css'
import { TodoProvider } from './context'

function App() {

  const [todos, setTodos] = useState([])

  //? Adding functionalities

  //* Adding new Todo ( todo )
  const addTodo = (todo) => {  
    setTodos ( (prev) => [{id: Date.now(), ...todo}, prev] );
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

  // App.jsx
return (
<TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleTodo}}>
  <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
      <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          {/* Todo form goes here */} 
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
        </div>
    </div>
  </div>
</TodoProvider>
)
}

```
## 3. LOCAL STORAGE PART

### **Step 3. Working on Local Storage :**
#### **Step 3.1. Getting and Setting the Local Storage :**

- To persist the to-do list data even after the page reloads, you can use `localStorage`. The data will be saved in the user's browser, allowing the to-do list to remain even after the user leaves and returns to the page.

```js

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
  

```
**First useEffect() usage**

- The first `useEffect` makes sure that when the component loads, it checks if there is a to-do list saved in `localStorage`. 
- If there is, it loads that list into the component's state so that the to-dos are shown when the app starts.
- If there’s no saved to-do list, it sets the state to an empty list.

**Second useEffect() usage**
- Whenever the `todos` state changes (via adding, editing, deleting, or toggling tasks), the second `useEffect` will trigger and update the `localStorage` with the new state.


**How this works:**
1. **On initial load (component mount):** 
    - The first `useEffect` is called.
    - If there are todos in `localStorage`, they are loaded into the state (setTodos).
1. **On state change (e.g., adding, updating, or deleting a todo):** 
    - The second `useEffect` is called.
    - It updates the `localStorage` with the new todos array every time the state changes.
    
## 4. TODOFORM AND TODOITEMS PART

### Step 4. `Defining` and `Using`, `TodoForm` and `TodoItems`