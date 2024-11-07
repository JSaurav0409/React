# Context API 

- The `Context API` is a built-in state management tool in React that helps you avoid "props drilling," which occurs when you have to pass data through many layers of components. 
- With Context, you can create a global state that can be accessed by any component in your application without having to pass props manually through every level.

## Key Features

- **Global State Management**: Share state across multiple components without prop drilling.

- **Provider and Consumer** : Use a `provider` to supply the data and a `consumer` to access it.


## Steps to Use Context API

1. **Create Context** 

- Define a context using `React.createContext()`. 
- It’s best practice to create a separate file for your context, such as `context/UserContext.js`.
- It should be in `.js`.

```javascript

// UserContext.js

import React from 'react';

const UserContext = React.createContext();

export default UserContext;

```

2. **Create a Provider Component**
- To effectively manage and share state using the Context API, you need to create a `Provider Component`.
- This component will encapsulate the logic for the context state and wrap your application (or parts of it) that need access to this state.
- It’s best practice to create a separate file for your context, such as `context/UserContextProvider.jsx`.
- It should be in `.jsx`.

``` javascript
// context/UserContextProvider.jsx
import React, { useState } from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {
  // Define the state to be shared
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} {/* Render the child components that can access this context */}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

```
3. **Wrap Your Application with the Provider**
- To give your components access to the context, wrap your application with the `Provider` component you created.
- In this case it is `UserContextProvider`

```javascript
// App.jsx

import './App.css'
import UserContextProvider from './context/UserContextProvider'

function App() {

  return (
    <UserContextProvider>
      <h1>Context API</h1>
    </UserContextProvider>
  )
}

export default App
```

4. **Consume the Context in Components**
- To access the shared state, use `useContext` within any component that needs it. 
- Alternatively, you could use a `Consumer`, though `useContext` is generally simpler and more common in function components.

**Example Using `useContext`:**
- Let’s create two example components: `Login.js` (to update the user context) and `Profile.js` (to display the user data).

1. **`Login.js`**: This component will access `setUser` from the context to set the user's information.

   ```javascript
   // Login.js
   import { useState, useContext } from 'react';
   import UserContext from '../context/UserContext';

   function Login() {
       const [username, setUsername] = useState('');
       const [password, setPassword] = useState('');
       const { setUser } = useContext(UserContext);

       const handleSubmit = (e) => {
           e.preventDefault();
           setUser({ username, password });
       };

       return (
           <div>
               <h2>Login Page</h2>
               <input
                   type="text"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   placeholder="Username"
               />
               <input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password"
               />
               <button onClick={handleSubmit}>Submit</button>
           </div>
       );
   }
   export default Login;

2. **`Profile.js`**: This component will access `user` from the context to display the logged-in user’s information.

   ```javascript
   // Profile.js
   import { useContext } from 'react';
   import UserContext from '../context/UserContext';

   function Profile() {
       const { user } = useContext(UserContext);

       if (!user) return <div>Please Login</div>;

       return <div>Welcome, {user.username}!</div>;
   }

   export default Profile;

### 5. **Add Components to Your Application**

Update the main `App.js` file to include the `Login` and `Profile` components within the provider so that both components have access to the `UserContext`.

```javascript
// App.js
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';
import UserContextProvider from './context/UserContextProvider';

function App() {
    return (
        <UserContextProvider>
            <div>
                <h1>Context API Demo</h1>
                <Login />
                <Profile />
            </div>
        </UserContextProvider>
    );
}

export default App;
```

## Final Summary of Steps to Implement Context API

1. **Create Context**:
   - Define a context using `React.createContext()`.
   - Store it in a separate file, such as `UserContext.js`.

2. **Create a Provider Component**:
   - Manage and share state by creating a provider component (e.g., `UserContextProvider.jsx`).
   - Wrap the `children` components in the context's provider to give them access to shared data.

3. **Wrap the Application with the Provider**:
   - In the root component (e.g., `App.js`), wrap the entire app (or specific sections) with the `UserContextProvider`.

4. **Consume the Context in Components**:
   - Use `useContext(UserContext)` in components like `Login.js` and `Profile.js` to access and manipulate the shared state.

5. **Add Components to the Application**:
   - Integrate components that consume the context into your app’s main structure, ensuring they are within the provider’s scope.

---

This implementation now enables seamless sharing of state across components without prop drilling. The Context API is particularly useful for global data such as user authentication, theme preferences, and language settings.
