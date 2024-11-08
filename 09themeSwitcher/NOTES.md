# Theme Toggle Application with React and Tailwind CSS

This application allows users to toggle between light and dark themes using React, Tailwind CSS, and the Context API for global state management. Here’s a breakdown of the implementation steps and code:

---

## Key Features

- **Global Theme Management**: Uses React Context API to manage theme state across components.
- **Theme Toggle Button**: Provides a switch to toggle between light and dark modes.
- **Persistent Theme State**: Uses `useEffect` to update the `<html>` class based on the theme mode.
- **Responsive UI**: Tailwind CSS is used for consistent and responsive styling.

---

## Steps to Implement Theme Toggle with Context API

### 1. **Create the Theme Context**

Define a context to store theme state and toggle functions. 

```javascript
// src/contexts/theme.js
import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    themeMode: 'light',
    darkMode: () => {},
    lightMode: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
    return useContext(ThemeContext);
}
```

### 2. **Configure the App Component**
In the main component `(App.js)`, set up the theme management logic, including `useState` for theme state and `useEffect` to apply the theme class to the `<html>` element.

```javascript 

// src/App.js
import { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './contexts/theme';
import ThemeBtn from './components/ThemeBtn';
import Card from './components/Card';

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const lightMode = () => { 
    setThemeMode("light");
  }

  const darkMode = () => {
    setThemeMode("dark");
  }

  // Apply the current theme class to <html> on change
  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark");
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkMode, lightMode }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>
          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

```

### 3. **Implement the Theme Toggle Button**

The `ThemeBtn` component provides a toggle switch to change themes by updating the `themeMode` in `ThemeContext`.

```javascript

// src/components/ThemeBtn.js
import useTheme from "../contexts/theme";

export default function ThemeBtn() {
    const { themeMode, darkMode, lightMode } = useTheme();

    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked;
        darkModeStatus ? darkMode() : lightMode();
    }

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                onChange={onChangeBtn}
                checked={themeMode === "dark"}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Toggle Theme</span>
        </label>
    );
}

```

### 4. **Create a Card Component**
The `Card` component is a sample component to demonstrate theme styling using Tailwind’s `dark` class modifiers.

```javascript

// src/components/Card.js

export default function Card() {
    return (
        <div className="w-full bg-white border rounded-lg shadow dark:bg-gray-800">
            <a href="/">
                <img className="p-8 rounded-t-lg" src="https://www.apple.com/v/apple-watch-series-10/b/images/overview/finishes-aluminum/gallery/finish_alum_black_02__bu7sw1szt336_xlarge.jpg" alt="product_image1" />
            </a>
            <div className="px-5 pb-5">
                <a href="/">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Apple Watch Series 10 GPS, Aluminium Case, Starlight Sport
                    </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold rounded dark:bg-blue-200 dark:text-blue-800 ml-3">4.0</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                    <a
                        href="/"
                        className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Add to cart
                    </a>
                </div>
            </div>
        </div>
    );
}

```
### 5. **Tailwind Configuration**
Ensure Tailwind is set up to use `darkMode` by setting it to `class` in the Tailwind configuration file.

```javascript

// tailwind.config.js
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
}

```

## Summary of Complete Steps

1. **Create Theme Context**: Set up a context to store and provide theme state and toggle functions.

2. **Configure App Component**: Use `useState` and `useEffect` to manage and apply the theme mode.

3. **Theme Toggle Button**: Add a switch to toggle between light and dark themes.

4. **Card Component**: Demonstrate dark and light mode styles with Tailwind’s `dark` modifier.

5. **Tailwind Configuration**: Enable `darkMode` using the `class` strategy in Tailwind’s configuration file.

---

This implementation provides a responsive, theme-switching UI with clear separation of responsibilities among components, making it easy to add further functionality as needed.
