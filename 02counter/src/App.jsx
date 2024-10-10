import { useState } from 'react';
import './App.css';

function App() {
  // let counter = 0;

  let [counter, setCounter] = useState(0)

  function addValue() {
    // console.log('clicked', Math.random()*10);
    // counter = counter + 1;
    setCounter(counter + 1)
  }

  function decreaseValue() {
    // counter = counter - 1;
    setCounter(counter - 1)

  }

  return (
    <>
      <h1>Counter  {counter}</h1>
      <h2>Counter value : {counter}</h2>
      <button style={{ marginRight: '30px' }}
      onClick={addValue}
      >Increment ++</button>
      <button
      onClick={decreaseValue}
      >Decrement --</button>
      <p>Footer :  {counter}</p>
    </>
  );
}

export default App;
