import React from "react";
import { useDrop, useDrag } from "react-dnd";

const ProgressCell = ({
  rowIndex,
  colIndex,
  cell,
  onDrop,
  onRemove,
  moveTrack,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "track",
    drop: (item) => {
      if (item.fromProgressBar) {
        moveTrack(item.rowIndex, item.colIndex, rowIndex, colIndex);
      } else {
        onDrop(rowIndex, colIndex, item.file);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "track",
    item: { file: cell, fromProgressBar: true, rowIndex, colIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <td
      ref={drop}
      className="progress-cell"
      style={{
        backgroundColor: isOver ? "lightgreen" : "white",
        border: "1px solid lightgray",
        position: "relative",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {cell && (
        <div ref={drag} className="cell-content">
          {cell}
        </div>
      )}
    </td>
  );
};

export default ProgressCell;
