import React from "react";
import "./styles.css";
import Draggable from "react-draggable";
import Annotataor from "./annotator";

const App = ({options}) => {
    return (
        <div className="outerFrame">
        <Draggable>
      <div className="workingarea">
        <Annotataor options={options} />
      </div>
      </Draggable>
      </div>
    );
  }


export default App
