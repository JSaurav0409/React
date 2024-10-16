import { useState } from "react";
import Button from "./components/Button";

function App() {
    const [color, setColor] = useState("white");

    const colors = ["Salmon", "aqua", "olive", "grey", "maroon", "brown", "pink", "LightCoral"];

    return (
        <div className="w-full h-screen duration-100" style={{ backgroundColor: color }}>
            <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
                <div className="flex flex-wrap justify-center gap-3 shadow-xl bg-white px-3 py-2 rounded-3xl">
                    {colors.map((color) => (
                        <Button key={color} color={color} changeColor={setColor} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
