import Chai from "./chai";

function App() {
  const username = 'Saurav Jha'
  return (
    <>
      <h1>React with Vite | {username}</h1>
      <p>
        Vite is a next-generation frontend build tool that is significantly faster than traditional bundlers like Webpack. It provides instant server startup and lightning-fast hot module replacement (HMR), making development more efficient and enjoyable.
      </p>
      <h2>Briefly</h2>
      <p>
        Vite is fast, lightweight, and simplifies the development process with quick builds and real-time updates.
      </p>
      <Chai /> {/* Adding one component into another component in react file. In JSX you can only return only one element. So we used fragments <></>*/}
      <p>How to inject variable in React ? </p>
      <p>We can do that using curly braces. The curly braces known as evaluated expressions and we can't write javascript in evaluated expressions. Syntax not allow us to do that.</p>
    </>
  );
}

export default App;
