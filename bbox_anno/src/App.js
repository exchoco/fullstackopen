import React, { useState, useEffect } from "react";
import "./styles.css";
import Draggable from "react-draggable";
import Annotataor from "./annotator";

const App = ({options, idata}) => {
    const [draggingEnabled, setDraggingEnabled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Shift') {
        setDraggingEnabled(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Shift') {
        setDraggingEnabled(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
    }, []);

    return (
        <div className="outerFrame">
        <Draggable disabled={!draggingEnabled}>
      <div className="workingarea" >
        <Annotataor options={options} idata = {idata}/>
      </div>
      </Draggable>
      </div>
    );
  }


export default App
