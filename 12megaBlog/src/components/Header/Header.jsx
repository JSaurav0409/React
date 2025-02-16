import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  // Fetch authentication status from the Redux store
  const authStatus = useSelector((state) => state.auth.status);

  // Define navigation items with conditional rendering based on authentication status
  const navItems = [
    { name: "Home", slug: "/", active: true }, // Always visible
    { name: "Login", slug: "/login", active: !authStatus }, // Visible only when logged out
    { name: "All Posts", slug: "/all-posts", active: authStatus }, // Visible only when logged in
    { name: "Add Post", slug: "/add-post", active: authStatus }, // Visible only when logged in
    { name: "Sign up", slug: "/signup", active: !authStatus }, // Visible only when logged out
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
            {navItems.map(
              (item) =>
                item.active && ( // Render only active navigation items
                  <li key={item.name}>
                    <Link
                      to={item.slug} // Using <Link> for navigation
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}

            {/* Logout Button: Visible only when the user is logged in */}
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
