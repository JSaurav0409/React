import React, { useId } from "react";

/**
 * InputBox Component
 * A reusable input component with optional label support and customizable styles.
 *
 * @param {string} label - The label text displayed above the input field.
 * @param {string} type - The type of the input (e.g., "text", "password", "email"). Default is "text".
 * @param {string} className - Additional CSS classes for customization.
 * @param {object} props - Any additional props to be passed to the input element.
 * @param {React.Ref} ref - A forwarded ref for the input element.
 */
const InputBox = React.forwardRef(function InputBox(
  { label, type = "text", className = "", ...props }, // Destructure props
  ref // Forwarded ref for input element
) {
  // Generate a unique ID for accessibility
  const id = useId();

  return (
    <div className="w-full">
      {/* Render the label if provided */}
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      {/* Render the input field with dynamic classes and props */}
      <input
        type={type} // Set the input type
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} // Combine default and custom classes
        ref={ref} // Attach forwarded ref
        {...props} // Spread additional props
        id={id} // Assign unique ID for label association
      />
    </div>
  );
});

export default InputBox;
