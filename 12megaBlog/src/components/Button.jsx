import React from "react";

/**
 * Button Component
 * A reusable button component with customizable styles and props.
 *
 * @param {React.ReactNode} children - The content inside the button (e.g., text or icons).
 * @param {string} type - The type of the button (e.g., "button", "submit", "reset"). Default is "button".
 * @param {string} bgColor - Background color classes for the button. Default is "bg-blue-600".
 * @param {string} textColor - Text color classes for the button. Default is "text-white".
 * @param {string} className - Additional CSS classes for customization.
 * @param {object} props - Any additional props to be passed to the button element (e.g., onClick, disabled).
 */
function Button({
  children, // Content inside the button
  type = "button", // Default button type
  bgColor = "bg-blue-600", // Default background color
  textColor = "text-white", // Default text color
  className = "", // Additional custom classes
  ...props // Additional props like onClick, aria-label, etc.
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} // Combine default and custom classes
      {...props} // Spread additional props
    >
      {children} {/* Render button content */}
    </button>
  );
}

export default Button;
