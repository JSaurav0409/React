import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Import global CSS styles
import App from "./App.jsx"; // Main application component
import { Provider } from "react-redux"; // Redux Provider for state management
import store from "./store/store.js"; // Import Redux store
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // React Router for navigation

import { AuthLayout, Login } from "./components/index.js"; // Authentication-related components

// Importing page components
import AddPost from "./pages/AddPost.jsx";
import AllPost from "./pages/AllPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import Signup from "./pages/Signup.jsx";

// Defining routes using React Router
const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // Main layout component
    children: [
      { path: "/", element: <Home /> }, // Home page

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login /> {/* Login page (only for unauthenticated users) */}
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup /> {/* Signup page (only for unauthenticated users) */}
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication={true}>
            <AllPost />{" "}
            {/* Protected route: visible only for authenticated users */}
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication={true}>
            <AddPost />{" "}
            {/* Protected route: allows authenticated users to add posts */}
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication={true}>
            <EditPost />{" "}
            {/* Protected route: users can edit posts using the post slug */}
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post /> /* Public route: View individual posts */,
      },
    ],
  },
]);

// Rendering the application
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Providing Redux store to the entire app */}
      <RouterProvider router={router} /> {/* Setting up routing */}
    </Provider>
  </React.StrictMode>
);
