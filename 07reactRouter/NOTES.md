# React Router

React Router is a popular library for handling routing in React applications. It allows for single-page application (SPA) navigation without full page reloads by managing URL changes and rendering the appropriate components.

## Key Features

1. **Declarative Routing**: Define routes using JSX, making routing structure easy to understand and integrate with React components.
2. **Nested Routes**: Allows you to create nested UI components that match the nested URL paths.
3. **Data Loaders**: Fetch data for components before they render.
4. **Dynamic Routing**: Supports dynamic routing where routes can be created and removed based on the app's state.
5. **Error Handling**: Allows specific error components for routes if a route fails to load data or has issues.

## Installation

Install React Router by running:
```bash
npm install react-router-dom
```

- This project uses `react-router-dom` to manage client-side routing. The layout includes a persistent header, footer, and various page components such as home, about, contact, user, and GitHub profile pages.

## `createBrowserRouter` in React Router

`createBrowserRouter` is a function in React Router that creates a router instance using the HTML5 history API. This router enables the smooth handling of single-page application (SPA) navigation without reloading the page, providing a seamless user experience.

### Key Features

- **Declarative Routing**: Define routes using an array of route objects or JSX elements.
- **Nested Routes**: Allow complex, nested UI patterns to match nested URL paths.
- **Data Loaders**: Fetch data for routes before rendering, improving data handling and performance.
- **Error Handling**: Specify error elements for specific routes to manage loading failures.


## `createRoutesFromElements` in React Router

`createRoutesFromElements` is a utility function in React Router that allows you to define routes using JSX, making route configuration more intuitive and readable. It simplifies route definitions by letting you use JSX syntax directly rather than nested objects. 

### Key Features

- **JSX Syntax**: Write routes in familiar JSX syntax, improving readability.
- **Nested Routes**: Define nested routes easily by nesting `<Route>` components within a parent route.
- **Dynamic Routing**: Supports parameters for dynamic routes and integrates well with loaders, actions, and error handling.

## Basic Syntax

```javascript
// There is two way to declare route 

import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/', // Base path
    element: <Layout />, // Layout component for all routes within this path
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);

// Second way 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='home' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='user/:userId' element={<User />} />
      <Route loader={githubInfoLoader} path='github' element={<Github />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

```

## Loader 

The `loader` function in React Router is a powerful way to load data before a route's component renders. This pre-fetching of data ensures that the necessary content is available as soon as the component loads, improving the user experience by avoiding loading spinners and reducing flickers caused by delayed data.

### Key Features

- **Data Fetching**: Fetch data for a route before rendering the component.
- **Seamless Navigation**: Avoids unnecessary component re-renders by ensuring data is available upfront.
- **Error Handling**: Allows you to handle errors if data fetching fails, improving the robustness of the application.

## Syntax

To use a loader, add a `loader` function to a route. This function should return a `Promise` that resolves with the data needed for the component.

```javascript

// main.jsx

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'github',
        element: <Github />,
        loader: githubInfoLoader, // Define a loader function to fetch data
      },
    ],
  },
]);
```
```javascript

// Github.jsx

import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

export default function Github() {
    const profile = useLoaderData()
    return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs m-auto mt-10 mb-10 border border-gray-300">
    <img
        src={profile.avatar_url}
        alt="GitHub profile"
        className="w-300 h-240 rounded-full mx-auto border-4 border-gray-400"
    />
    <h2 className="text-center text-2xl font-semibold mt-4 text-gray-600">GitHub Profile</h2>
      <div className="text-center text-gray-600 mt-2 space-y-2"> {/* Adds vertical space between items */}
        <p>
        Name : <span className="font-bold text-gray-800">{profile.name}</span>
        </p>
        <p>
        Followers : <span className="font-bold text-gray-800">{profile.followers}</span>
        </p>
      </div>
    </div>
)
}

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/JSaurav0409')
    return response.json()
}

```