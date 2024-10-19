import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  //* Step 1: Collecting and initializing all necessary state variable.
  //* Step 2: Using useCallback(fn,[dependencies]) for cache a function definition between re-renders.
  //* Step 3: Using useEffect(setup, [dependencies]) for let run the code after components render or its dependencies get triggered.
  //* Step 4: Copying the password in user's clipboard
  //* Step 5: Using useRef() for giving effect when user copied password.
  
  // Step 1: Initialize state variables for password settings and generated password
  const [length, setLength] = useState(8)             // Password length
  const [addNum, setAddNum] = useState(false)         // Toggle for adding numbers to the password
  const [addChar, setAddChar] = useState(false)       // Toggle for adding special characters to the password
  const [password, setPassword] = useState("")        // Generated password

  // Step 5: useRef() to manage the reference to the password input field
  const passwordRef = useRef(null)

  // Step 2: Using useCallback to cache the passwordGenerator function to prevent re-defining it on every render.
  const passwordGenerator = useCallback(() => {

    /* 
    Logic behind passwordGenerator:
      1. Initialize 'pass' to hold the generated password and 'str' to hold the allowed characters (A-Z and a-z).
      2. If addNum is true, append 0-9 to 'str'.
      3. If addChar is true, append special characters to 'str'.
      4. Use a loop to randomly select characters from 'str' until the desired length is reached.
      5. Set the generated password using setPassword(pass).
    */
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (addNum) str += "0123456789" 
    if (addChar) str += "!@#$%^&*()_+"

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, addNum, addChar])  // Dependencies for the callback

  // Step 4: Function to copy the generated password to the clipboard
  const copyPassword = useCallback(() => {
    passwordRef.current?.select()                               // Selects the password text
    window.navigator.clipboard.writeText(password)              // Copies the text to clipboard
    //! Note: The 'window' object is available only in the browser, not in server-side environments like Next.js
  }, [password])

  // Step 3: useEffect to regenerate the password whenever dependencies (length, addNum, addChar) change
  useEffect(() => {
    passwordGenerator()
  }, [length, addNum, addChar, passwordGenerator])  // Re-run when these dependencies are triggered

  return (
  <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-400 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
      
      {/* Input field for displaying the generated password */}
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}   // Reference to the input element
          />
          <button
            onClick={copyPassword}    // Copy the password on button click
            className='outline-none bg-blue-500 text-white px-3 py-1.5 shrink-0 hover:bg-blue-700 active:bg-blue-800'>
          Copy</button>
        </div>  

      {/* Controls for setting password length, numbers, and special characters */}
      <div className='flex text-sm gap-x-2'>
          
          {/* Range input for password length */}
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange= { (e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          {/* Checkbox for adding numbers */}
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={addNum}
              id='numberInput'
              className='cursor-pointer'
              onChange={() => setAddNum((prev) => !prev)}   // Toggles the addNum state
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          {/* Checkbox for adding special characters */}
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={addChar}
              id='charInput'
              className='cursor-pointer'
              onChange={() => setAddChar((prev) => !prev)}  // Toggles the addChar state
            />
            <label htmlFor='charInput'>Characters</label>
          </div>

        </div>
    </div>
  </>
  )
}

export default App