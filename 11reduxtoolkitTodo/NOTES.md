## Steps for Creating a Todo App with Redux Toolkit (RTK)

---
## REDUX: An Independent State Management Library

Redux is a powerful state management library that helps you manage and share state across your entire application in a predictable way.

---


### Redux Principles

1. **Single Source of Truth**

   - The entire application state is stored in a single object tree within a single store.
   - This ensures consistency and makes debugging easier.

2. **State is Read-Only**

   - State cannot be modified directly.
   - Instead, state changes occur through actions, ensuring controlled and predictable updates.

3. **Changes are Made Through Pure Functions**
   - Reducers are pure functions that dictate how the state changes in response to actions.
   - This ensures that state updates are consistent and testable.

---

### Redux Installation

1. **Create a React App**  
   Set up your React app using your preferred method. For example, using Vite:

```bash

   # Create a new React app with Vite

   npm create vite@latest projectname

   # Navigate to the project folder

   cd projectname

   # Install dependencies

   npm install

```

2. **Install redux**
   Install Redux Toolkit and React-Redux

```bash

   # Install Redux Toolkit

   npm install @reduxjs/toolkit

   # Install React-Redux

   npm install react-redux

```

---

## 1. How to setup the Redux in project.

### 1. Set up the Store

- **Folder Structure:**

  - Create a folder for `store` to organize all store-related files.
    You can name it whatever you want.

- **Create Store:**

  - Use the `configureStore` function from `@reduxjs/toolkit` to create the store.

  ```javascript
  import { configureStore } from "@reduxjs/toolkit";
  import todoReducer from "../feature/todo/todoSlice.js";
  export const store = configureStore({
    reducer: todoReducer,
  });
  ```

### 2. Set Up and export the Reducers (Slices)

- **Folder Structure:**

  - Create a `reducers` folder. Inside this folder, organize slices into separate folders.
  - Use the `createSlice` function from `@reduxjs/toolkit` to create the slices.
  - And here we are also usning the `nanoid` method to generate the unique id's.

  Example structure:  
  reducers/
  ├── todoSlice / todoSlice.js
  ├── anotherSlice / anotherSlice.js

```javascript
import { createSlice, nanoid } from "@reduxjs/toolkit";

// * First step : Create a initialState

const initialState = {
  todos: [{ id: 1, text: "Hello world !" }],
};

// * Second step : Define the slice includes (name, initialState, reducers)

const todoSlice = createSlice({
  name: "todo",
  initialState, // we can declare the initial state directly by using {todos : [{ id: 1, text: "Hello world}]}
  // reducers contain the property and function.
  // Here state is property which provide current state and actions are functions its provide current data which are provide which are accessible

  reducers: {
    //^ This reducer handles adding a new todo to the list.
    //^ `state` provides access to the current state of the array (e.g., the existing list of todos).
    //^ `action` carries information about what change needs to be made.
    //^ `action.payload` contains the text of the new todo item to be added.

    addTodo: (state, action) => {
      const todo = {
        // Generate a unique ID for the new todo using nanoid().
        id: nanoid(),
        // Set the text of the todo using the payload from the action.
        text: action.payload,
      };
      // Push the new todo object into the todos array within the state.
      state.todos.push(todo);
    },
  },

  //& This reducer handles removing a todo item from the list.
  //& `state` provides access to the current state of the todos array.
  //& `action.payload` is expected to contain the ID of the todo item to be removed.

  removeTodo: (state, action) => {
    // Filter the todos array, keeping only the items whose IDs do not match the provided ID.
    // This effectively removes the todo item with the specified ID.
    state.todos = state.todos.filter((todo) => todo.id !== action.payload);
  },

  // ~ This reducer handles updating the text of a specific todo item.
  // ~ Finding the selected todo using the provided ID from action.payload.

  updateTodo: (state, action) => {
    const updatedTodo = state.todos.find(
      (todo) => todo.id === action.payload.id
    );
    // If a matching todo is found, update its text with the new value from action.payload.text.
    // Ensure to handle cases where no matching todo is found to avoid runtime errors.
    if (updatedTodo) {
      updatedTodo.text = action.payload.text;
    }
  },
});

// * Third Step: Export

// * Exporting the action creators generated by `createSlice`.
// * These can be used to dispatch actions for `addTodo`, `removeTodo`, and `updateTodo`.
export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

// * Exporting the reducer generated by `createSlice`.
// * This reducer will be used in the store configuration to handle state updates for the todo slice.
export default todoSlice.reducer;
```

---

## 2. Working on Components

- Create a folder and name it `components`
- Create `AddTodo.jsx` and `Todo.jsx` in that folder.

**2.1. AddTodo.jsx**

- "AddTodo.jsx sends actions to the store. The store uses reducers to update the state based on these actions."

```javascript
// AddTodo.jsx is a form.

import { useState } from "react"; // To manage local state for the input field
import { useDispatch } from "react-redux"; // To dispatch actions to the Redux store
import { addTodo } from "../feature/todo/todoSlice"; // Importing the addTodo action

function AddTodo() {
  const [input, setInput] = useState(""); // Local state to handle the input value
  const dispatch = useDispatch(); // Hook to access the Redux dispatch function

  // ^ Handler for adding a new todo item
  const addTodoHandler = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (input.trim()) {
      // Only dispatch if input is not empty or whitespace
      dispatch(addTodo(input)); // Dispatch the addTodo action with the input value
      setInput(""); // Clear the input field after adding the todo
    }
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      {/* Input field for entering a todo */}
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input} // Controlled component bound to local state
        onChange={(e) => setInput(e.target.value)} // Update the state with user input
      />
      {/* Submit button to add a todo */}
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;
```

**2.2. Todo.jsx**

- This component will display the list of todos and provide functionality for editing and removing todos.

```javascript
import { useState } from "react"; // Hook for managing local state
import { useSelector, useDispatch } from "react-redux"; // Hooks to interact with Redux store
import { removeTodo, updateTodo } from "../feature/todo/todoSlice"; // Importing actions
import { FaEdit, FaSave, FaTrashAlt } from "react-icons/fa"; // Icons for actions

function Todo() {
  const todos = useSelector((state) => state.todos.todos); // Fetch the todos array from Redux store
  const dispatch = useDispatch(); // Hook to dispatch actions

  const [editingTodo, setEditingTodo] = useState(null); // State for tracking which todo is being edited
  const [newText, setNewText] = useState(""); // State for the new text of the todo

  // Handle the click of the "Edit" button
  const handleEditClick = (todo) => {
    setEditingTodo(todo); // Set the todo to be edited
    setNewText(todo.text); // Set the newText to the current text of the todo
  };

  // Handle the click of the "Save" button
  const handleSaveClick = () => {
    if (newText.trim()) {
      // Ensure that the new text is not empty
      dispatch(updateTodo({ id: editingTodo.id, text: newText })); // Dispatch the update action
      setEditingTodo(null); // Reset the editing state
      setNewText(""); // Clear the input field
    }
  };

  return (
    <ul className="list-none mt-8">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="mt-4 flex justify-between items-center bg-zinc-800 px-6 py-3 rounded-lg shadow-lg"
        >
          <div className="flex items-center">
            {editingTodo?.id === todo.id ? (
              // If the todo is being edited, show an input field for editing
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)} // Update newText as the user types
                className="bg-zinc-700 text-white py-1 px-3 rounded-md"
                placeholder="Edit todo..."
              />
            ) : (
              // If not being edited, display the text
              <span className="text-white">{todo.text}</span>
            )}
          </div>

          {/* Buttons for Edit, Save, and Delete */}
          <div className="flex items-center">
            {editingTodo?.id === todo.id ? (
              <button
                onClick={handleSaveClick} // Save the edited todo
                className="ml-2 text-white bg-green-500 py-1 px-4 rounded-md"
              >
                <FaSave className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(todo)} // Start editing the todo
                className="ml-2 text-white bg-blue-500 py-1 px-4 rounded-md"
              >
                <FaEdit className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => dispatch(removeTodo(todo.id))} // Dispatch the removeTodo action
              className="ml-2 text-white bg-red-500 py-1 px-4 rounded-md"
            >
              <FaTrashAlt className="w-5 h-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Todo;
```

---

## 3. Main App Component (App.jsx and Main.jsx)

### **3.1. App Component (`App.jsx`)**

## 3. **Main App Component (`App.jsx` and `Main.jsx`)**

### **3.1. App Component (`App.jsx`)**

The `App.jsx` component serves as the central hub where you combine all the functionality of your application. It will render the `AddTodo` and `Todo` components, providing a space for users to add and view todos.

Here’s the updated code for `App.jsx`:

```javascript
import AddTodo from "./components/AddTodo"; // Import the AddTodo component to allow adding new todos
import Todo from "./components/Todo"; // Import the Todo component to display and manage todos

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-8">Redux Todo App</h1>{" "}
      {/* Main title */}
      <AddTodo /> {/* Render the AddTodo component to allow adding new todos */}
      <Todo />{" "}
      {/* Render the Todo component to display and manage the list of todos */}
    </div>
  );
}

export default App;
```

**Explanation:**

- `AddTodo` Component: Allows the user to add new todos to the list.
- `Todo` Component: Displays the list of todos and provides options to remove or edit them.

### **3.2. Main Entry Point (`Main.jsx` or `index.js`)**

In this step, you'll set up the root entry point of your application, where you integrate Redux and render the `App` component. You do this by wrapping the `App` component in a `Provider` and passing the Redux `store`.

Here’s how to set up the main entry point (`index.js`):

```javascript
import { createRoot } from "react-dom/client"; // Import createRoot to render the React app
import "./index.css"; // Import global styles (TailwindCSS)
import App from "./App.jsx"; // Import the main App component
import { Provider } from "react-redux"; // Import Provider to make the Redux store available globally
import { store } from "./app/store.js"; // Import the Redux store

// Render the App component inside the Provider, passing the store to make it available to the app
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {" "}
    {/* Provide Redux store to the entire app */}
    <App />
  </Provider>
);
```

**Explanation:**

- `Provider` Component: The `Provider` from `react-redux` makes the Redux store accessible throughout the component tree. By wrapping the `App` component with `Provider`, all child components can connect to the store and access or update the application state.
- `createRoot`: This is used to render the application, replacing the deprecated `ReactDOM.render()` in React 18.