# Notes on Learning from This Episode

## Component Naming Conventions:
- Always start component function names with a capital letter (e.g., `Chai`). This is a convention in React that differentiates components from regular HTML tags.

## File Naming:
- Capitalize the filenames of your components (e.g., `Chai.jsx`) to maintain consistency and improve readability in your project.

## File Extensions:
- In **Create React App**, you can use either `.js` or `.jsx` for component files. However, when using **Vite**, it is recommended to use the `.jsx` extension for files containing JSX syntax, as this makes it clear that the file contains React components.

## JSX Fragments:
- In JSX, you can only return one root element from a component. To return multiple elements, you can wrap them in a React Fragment (`<>...</>`), allowing you to group a list of children without adding extra nodes to the DOM.

## Component Composition:
- You can easily add one component into another by including the component's name as a tag (e.g., `<Chai />`). This allows for modular and reusable code in your React application.
