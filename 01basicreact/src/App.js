import Chai from "./Chai";

function App() {
  return (
    <>
      <h1>Hello World!</h1>
      <p>There are two ways to create a React application:</p>
      <ol>
        <li>Using <code>npx</code>, which consumes more resources.</li>
        <li>Using <code>npm</code>, which consumes fewer resources.</li>
      </ol>

      <Chai />
    </>
  );
}

export default App;
