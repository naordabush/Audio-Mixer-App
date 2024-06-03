import React from "react";

const ControlButtons = ({ play, stop, toggleLoop, isLooping }) => {
  return (
    <div className="controls">
      <button onClick={play}>Play</button>
      <button onClick={stop}>Stop</button>
      <button onClick={toggleLoop}>
        {isLooping ? "Disable Loop" : "Enable Loop"}
      </button>
    </div>
  );
};

export default ControlButtons;
