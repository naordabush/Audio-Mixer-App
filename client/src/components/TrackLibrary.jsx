import React from "react";
import Track from "./Track";

const TrackLibrary = ({ audioFiles, channels, toggleMute }) => {
  return (
    <div className="track-library">
      {audioFiles.map((file, index) => (
        <Track
          key={index}
          index={index}
          file={file}
          channel={channels[index]}
          toggleMute={toggleMute}
        />
      ))}
    </div>
  );
};

export default TrackLibrary;
