import React from "react";
import ProgressCell from "./ProgressCell";

const ProgressBar = ({ grid, onDrop, onRemove, moveTrack }) => {
  return (
    <div className="progress-bar">
      <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <ProgressCell
                  key={colIndex}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  cell={cell}
                  onDrop={onDrop}
                  onRemove={onRemove}
                  moveTrack={moveTrack}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="time-markers">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="time-marker">
            {i}s
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
