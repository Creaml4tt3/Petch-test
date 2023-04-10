import Petch from "./Petch";
import { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const textRef = useRef();
  const [state, setstate] = useState("text");

  useEffect(() => {
    /* alert(state); */
  }, [state]);

  useEffect(() => {
    console.log(textRef);
    textRef.current.addEventListener("mouseenter", () => {
      alert("test");
    });
  }, []);

  const handleClick = () => {
    setstate("Petch");
  };

  return (
    <div className="App">
      <div ref={textRef}>{state}</div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default App;
