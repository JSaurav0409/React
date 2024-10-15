
# Tailwind CSS and Props

## Props 
  1. In React, props (short for "properties") are a mechanism for passing data and event handlers from a parent component to a child component. 
  2. They allow you to create reusable and dynamic components by enabling them to accept inputs, which can be values, functions, or even other components.

  ### Key Features of Props
  1. `Immutable`: Props are read-only, meaning a child component cannot modify the props it receives. This ensures that the parent component maintains control over the data being passed down.
  2. `Data Flow`: Props facilitate a unidirectional data flow. Data is passed from parent to child, making it easier to understand and debug the application.
  3. `Customizable Components`: Props allow you to create customizable components that can behave differently based on the inputs they receive. This helps in building more generic and reusable components.
  4. `Event Handling` : Props can also be used to pass functions as props, enabling child components to communicate with their parents, such as handling events (e.g., button clicks).

## 1. Creating a React project using npm

```bash
npm create vite@latest
# Project setup prompts:
# ? Project name: <Project Name>
# ? Select a framework: React
# ? Select a variant: JavaScript

# Move into the project directory
cd <Project Name>

# Install dependencies
npm i
```

## 2. Install Tailwind CSS

Install Tailwind CSS and its dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 3. Configure Template Paths

In `tailwind.config.js`, specify the paths to your template files to enable Tailwind to purge unused styles:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 4. Add Tailwind CSS Directives to Your Styles

In `./src/index.css`, include Tailwind's base, components, and utility styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# How to inject different value in different card ?

- To inject unique values into different cards in a React component, use `props`. You can either access the props object or destructure it for cleaner code.