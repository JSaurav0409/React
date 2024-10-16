# Modular Color Changer App in React

This project is a modular React app that allows users to change the background color by clicking on dynamically rendered buttons, each representing a different color.

## Key Concepts

1. **State Management**: 
   - The background color is managed by React's `useState` hook, with `setColor` updating the state.

2. **Reusable Button Component**:
   - The `Button` component accepts `color` and `changeColor` as props, making it reusable for different colors.
   - On clicking a button, the background color changes based on the selected color.

3. **Dynamic Rendering**:
   - The `colors` array stores a list of colors.
   - Buttons are generated dynamically using `.map()` on the `colors` array, reducing redundant code.

## Advantages

- **Modularity**: 
   - The `Button` component is reusable for any color, making the app extensible and easier to maintain.
  
- **Scalability**: 
   - New colors can be easily added to the array without modifying other parts of the code.

- **Tailwind CSS for Styling**:
   - Buttons are styled with utility classes for consistency, responsive design, and smooth transitions.

## Adding Colors

To add more colors, update the `colors` array in the `App` component:

```js
const colors = ["Salmon", "aqua", "olive", "grey", "maroon", "brown", "pink", "LightCoral", "blue", "green"];
