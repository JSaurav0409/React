# INTERVIEW QUESTION ON COUNTER 

```
React

import { useState } from 'react';
import './App.css';

function App() {
  // let counter = 0;

  let [counter, setCounter] = useState(0)

  function addValue() {
    // console.log('clicked', Math.random()*10);
    // Add condition to prevent counter from going above 20
    if (counter < 20) {
      setCounter(counter + 1);
      setCounter(counter + 1);
      setCounter(counter + 1);
      setCounter(counter + 1);
      // counter = counter + 1;
    }
  }

  function decreaseValue() {
    // Add condition to prevent counter from going below 0
    if (counter > 0) {
      setCounter(counter - 1);
      // counter = counter - 1;
    }


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

```
### Code snippet
function addValue() {
    // console.log('clicked', Math.random()*10);
    // Add condition to prevent counter from going above 20
    if (counter < 20) {
      setCounter(counter + 1);
      setCounter(counter + 1);
      setCounter(counter + 1);
      setCounter(counter + 1);
      // counter = counter + 1;
    }
  }

- How will this work ?
- What is the expected output ?
    - +4
    - +1
- The correct answer is +1.

##### Correct Answer

- The `Correct Output is +1`: This is because React does not update the state immediately and does not recognize the multiple calls to setCounter in quick succession. Instead, it only considers the final state based on the initial value of counter at the time the function was called.


## SOME MORE INFORMATION

- We can say in state `counter` and `setCounter` is a function which accepts arguments.
- So we can write (prevCounter) => counter + 1

### Code snippet
```function addValue() {
    // console.log('clicked', Math.random()*10);
    // Add condition to prevent counter from going above 20
    if (counter < 20) {
      setCounter(prevCounter => counter + 1);
      setCounter(prevCounter => counter + 1);
      setCounter(prevCounter => counter + 1);
      setCounter(prevCounter => counter + 1);
      // counter = counter + 1;
    }
  }
```

### Expected Behavior

- Each invocation of setCounter(prevCounter => prevCounter + 1) will increment the counter by 1 based on the most recent state, not the initial state when the function was called .
- So here the increment will be +4 .