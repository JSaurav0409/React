import { useState } from "react"

function App() {

  const [color, setColor] = useState("white")

  return (
    <div className="w-full h-screen duration-100"
    style={{ backgroundColor: color }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-xl bg-white px-3 py-2 rounded-3xl">
          <button
          onClick={() => { setColor('red')}}  
          className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
          style={{ backgroundColor:"Red"}}
          >Red</button>
          <button
          onClick={() => { setColor('aqua')}}  
          className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
          style={{ backgroundColor:"Aqua"}}
          >Aqua</button>
          <button
          onClick={() => { setColor('olive')}}  
          className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
          style={{ backgroundColor:"Olive"}}
          >Olive</button>
          <button
          onClick={() => { setColor('grey')}}  
          className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
          style={{ backgroundColor:"Grey"}}
          >Grey</button>
          <button
          onClick={() => { setColor('maroon')}}  
          className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
          style={{ backgroundColor:"Maroon"}}
          >Maroon</button>
          <button
          onClick={() => { setColor('brown')}}  
          className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
          style={{ backgroundColor:"Brown"}}
          >Brown</button>
          <button
          onClick={() => { setColor('pink')}}  
          className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
          style={{ backgroundColor:"Pink"}}
          >Pink</button>
        </div>
      </div>
    </div>
  )
}

export default App