# Custom Render Function for React-like Elements

## Purpose:
The function **`customRender`** is a simplified version of React's `render` method. It takes an "element object" (a React-like element) and renders it into the DOM.

---

## Key Components

### 1. **React-like Element Structure**
The element in this case is a plain JavaScript object, similar to a React element, which has:
- `type`: The type of HTML element to create (`'a'`, `'div'`, etc.).
- `props`: An object containing the attributes and properties of the element (`href`, `target`, etc.).
- `children`: The content or child elements of the DOM node.

#### Example Element Object:
```js
const reactElement = {
    type: 'a',  // HTML element type (anchor)
    props: {    // Properties of the element
        href: 'https://www.google.com',
        target: '_blank',
    },
    children: 'Click Me'  // Inner HTML / child elements
};
