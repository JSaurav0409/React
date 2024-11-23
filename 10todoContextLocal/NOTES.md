# Todo's using Context API and Local Storage

### **Functionality in this TODO**:

- **_Add new task_**
- **_Task Completion Toggle (Need unique id for this)_**
- **_Edit task (Need unique id for this)_**
- **_Delete task (Need unique id for this)_**

# **Steps for Todo using Context API and Local Storage**

## 1. CONTEXT API PART

### **Step 1: Create Context**

#### **Step 1.1. Create the Context:**

- `TodoContext` is created using `createContext()`.
- This initializes a context object that contains the default structure for the To-Do data and functions.

#### **Step 1.2. Initial State:**

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
  todos: [
    // Properties
    {
      id: 1,
      todo: "Todo 1",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleTodo: (id) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
```

#### **Step 1.4. Exporting the Provider and Custom Hook:**

- To make the to-do functionality accessible throughout the app, export `TodoProvider` and useTodo from index.js. This setup allows any component wrapped in `TodoProvider` to access the to-do list data and functions (such as adding, updating, and deleting tasks) using the `useTodo` hook, without needing direct access to `TodoContext`.

- **CODE**

```javascript
// index.js

export { TodoContext, TodoProvider, useTodo } from "./todoContext";
```

## 2. WRAP `TODOPROVIDER` IN APPLICATION ROOT.

### **Step 2: Set Up `TodoProvider` in the Application Root**

Now that `TodoProvider` and `useTodo` are set up, the next step is to wrap the entire app (or the main component tree that needs access to the to-do context) in `TodoProvider` to provide global access to the context.

#### **Step 2.1. Wrap Application with `TodoProvider`:**

- Import `TodoProvider` from `todoContext.js` and wrap your app's root component.

```js
// App.jsx
return (
  <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}>
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          Manage Your Todos
        </h1>
        <div className="mb-4">{/* Todo form goes here */}</div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
        </div>
      </div>
    </div>
  </TodoProvider>
);
```

- Define functionality of `addTodo`, `updateTodo`, `deleteTodo`, `toggleTodo`.

```js
import { useState } from "react";
import "./App.css";
import { TodoProvider } from "./context";

function App() {
  const [todos, setTodos] = useState([]);

  //? Adding functionalities

  //* Adding new Todo ( todo )
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, prev]);
  };

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
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  //* Checked the selected TODO
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  // App.jsx
  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">{/* Todo form goes here */}</div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
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
  const todos = JSON.parse(localStorage.getItem("todos"));

  if (todos && todos.length > 0) {
    setTodos(todos);
  }
}, []);

// setting the items

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
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

## 4. COMPONENTS TODOFORM AND TODOITEMS PART

### Step 4: `Defining` and `Using`, `TodoForm` and `TodoItems`

#### Step 4.1. `TodoForm` Component

The `TodoForm` component is responsible for adding new tasks to the to-do list. It includes an input field where the user types a task and a button to submit the task.

```javascript
// TodoForm.js

import { useState } from "react";
import { useTodo } from "../context/todoContext";

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
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo} // <- Bind the value here
        onChange={(e) => setTodo(e.target.value)} // <- Update on change
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
```

#### Step 4.2. `TodoItems` Component

The `TodoItems` component is responsible for displaying each to-do item in the list. It will display the task description, its completion status, and allow the user to edit or delete tasks.

```javascript
// TodoItems.js
import { useState } from "react";
import { useTodo } from "../context/todoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleTodo } = useTodo(); // Corrected here

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleTodo(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
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
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
```

#### Step 4.3. Usage of Components in App

Now, integrate `TodoForm` and `TodoItems` into the main `App` component to create the full To-Do functionality.

```javascript
// App.js
import { useState, useEffect } from "react";
import "./App.css";
import { TodoProvider } from "./context";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  //? Adding functionalities

  //* Adding new Todo ( todo )
  const addTodo = (todo) => {
    setTodos((prev) => [{ ...todo }, ...prev]);
  };

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
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  //* Checked the selected TODO
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  //! Local Storage part

  // getting the items

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // setting the items

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              // We are using key={todo.id} to uniquely identify each todo item in the list.
              // This helps React efficiently update and re-render only the necessary elements in the list.
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
```

### Conclusion

In this guide, we have built a fully functional To-Do application using the **Context API** for state management and **Local Storage** for data persistence. Below is a summary of what we've covered:

1. **Context API Setup:**

   - We created the `TodoContext` to manage the state of the to-do list and provided functions for adding, updating, toggling completion, and deleting tasks.
   - The `TodoProvider` wrapped the app to provide global access to the to-do state and functions.

2. **Local Storage Integration:**

   - We ensured the to-do list data persists across page reloads by storing it in the browser's `localStorage`.
   - Used `useEffect` to load the stored data when the component mounts and save the updated data whenever the state changes.

3. **Components Implementation:**

   - **`TodoForm`** allows users to add new tasks to the list.
   - **`TodoItems`** displays the tasks and provides options to toggle completion, edit, and delete tasks.
   - Integrated these components into the `App` component, ensuring that the app is functional and interactive.

4. **State Management and Data Flow:**
   - The `useTodo` custom hook was used to access and modify the to-do data within any component wrapped by the `TodoProvider`.

### What You Can Do Next:

- **Styling:** Enhance the user interface with custom styles using CSS or CSS frameworks like Tailwind CSS or Bootstrap.
- **Advanced Features:** Implement additional features such as task prioritization, filtering tasks by status (completed or pending), or adding due dates.
- **API Integration:** Store your tasks in the cloud with services like Firebase for multi-device synchronization.
- **Responsive Design:** Ensure the app is responsive and works seamlessly on mobile devices.

This project provides a strong foundation for building more complex applications with Context API and Local Storage. You can extend it by integrating additional features and improving the UI/UX design.
