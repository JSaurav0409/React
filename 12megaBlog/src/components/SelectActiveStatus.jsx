import React, { useId } from "react";

/**
 *^ SelectActiveStatus Component
 ** A reusable dropdown component with label and customizable options.
 *
 * @param {Array} options - Array of options for the dropdown. Each option should have a `value` and `label`.
 * @param {string} label - The label text displayed above the dropdown.
 * @param {string} className - Additional CSS classes for styling the dropdown.
 * @param {object} props - Any additional props to be passed to the select element.
 * @param {React.Ref} ref - Forwarded ref for the select element.
 */

function SelectActiveStatus({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {/* Optionally looping, if there is value in options than the loop will work */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(SelectActiveStatus);
