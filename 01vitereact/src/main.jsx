import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

function MyApp() {
  return (
    <>
    <h2>Custom React | we can direct define and use function in one file</h2>
    </>
  )
}

// const reactElement = {
//     type: 'a',
//     props: {
//         href: 'https://www.google.com',
//         target: '_blank',
//     },
//     children: 'Click Me'
// };
{/*We wrote custom render to run this snippet we expect some parameter from user just like that the developer who wrote react 
  expected user will write code to parse and render jsx file or `React.createElement()` thats why the custom react object didn't run */ }


const anotherElement = (
  <a href="https://google.com" target="_blank">Visit Google</a>
)

const anotherUser = 'Saurav Jha'
const reactElement = React.createElement(
  'a',
  { href: 'https://www.google.com', target: '_blank' },
  'Click me to visit Google ',
  anotherUser
)

ReactDOM.createRoot(document.getElementById('root')).render(
  reactElement
)
