import React from "react";
import { useDrag } from "react-dnd";

const Track = ({ index, file, channel, toggleMute }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "track",
    item: { file },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="track" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <button onClick={() => toggleMute(index)}>
        {channel.muted ? "Unmute" : "Mute"}
      </button>
      <span>{file}</span>
    </div>
  );
};

export default Track;
