import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom"; // ✅ Outlet renders child components inside App
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./features/auth/authSlice.js";
import { Footer, Header } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true); // State to track authentication loading status
  const dispatch = useDispatch(); // Redux dispatcher for authentication actions

  useEffect(() => {
    // Fetch current user details from authentication service
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData })); // Dispatch login action if user exists
        } else {
          dispatch(logout()); // Dispatch logout action if user is not authenticated
        }
      })
      .finally(() => setLoading(false)); // Set loading to false after authentication check
  }, []);

  return !loading ? ( // Render only after authentication check is complete
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header /> {/* Navigation Header */}
        <main>
          <Outlet />{" "}
          {/* ✅ Renders the child components based on active route */}
        </main>
        <Footer /> {/* Page Footer */}
      </div>
    </div>
  ) : null; // Prevent UI flickering by showing nothing until loading is complete
}

export default App;
