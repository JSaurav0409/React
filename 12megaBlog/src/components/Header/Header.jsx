import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * Header Component
 * A responsive header with dynamic navigation items based on authentication status.
 */
function Header() {
  // Fetching authentication status from the Redux store
  const authStatus = useSelector((state) => state.auth.status);

  // React Router navigation hook
  const navigate = useNavigate();

  // Navigation Items Configuration
  const navItems = [
    {
      name: "Home", // Display name of the item
      slug: "/", // Path of the item
      active: true, // Always active
    },
    {
      name: "Login", // Display name for login
      slug: "/login", // Path for login page
      active: !authStatus, // Active only if the user is logged out
    },
    {
      name: "All Posts", // Display name for all posts
      slug: "/all-posts", // Path for all posts page
      active: authStatus, // Active only if the user is logged in
    },
    {
      name: "Add Post", // Display name for adding a post
      slug: "/add-post", // Path for adding a post
      active: authStatus, // Active only if the user is logged in
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          {/* Logo Section */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* Logout Button: Visible only if authStatus is true */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
