import React from 'react';

const Button = ({ color, changeColor }) => {
    return (
        <button
            onClick={() => { changeColor(color); }}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: color }}
        >
            {color.charAt(0).toUpperCase() + color.slice(1)} {/* Capitalize first letter */}
        </button>
    );
};

export default Button;
