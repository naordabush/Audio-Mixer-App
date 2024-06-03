import React, { useState, useRef, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TrackLibrary from "./components/TrackLibrary";
import ProgressBar from "./components/ProgressBar";
import ControlButtons from "./components/ControlButtons";
import "./App.css";

const App = () => {
  const audioFiles = [
    "tambourine_shake_higher.mp3",
    "ALL TRACK.mp3",
    "B VOC.mp3",
    "DRUMS.mp3",
    "HE HE VOC.mp3",
    "HIGH VOC.mp3",
    "JIBRISH.mp3",
    "LEAD 1.mp3",
    "UUHO VOC.mp3",
  ];

  const [channels, setChannels] = useState(
    audioFiles.map(() => ({ muted: false }))
  );
  const [grid, setGrid] = useState(
    Array(9)
      .fill()
      .map(() => Array(20).fill(null))
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const audioRefs = useRef([]);
  const progressBarRef = useRef();

  const toggleMute = (index) => {
    const newChannels = [...channels];
    newChannels[index].muted = !newChannels[index].muted;
    setChannels(newChannels);
  };

  const play = () => {
    setIsPlaying(true);
    let currentTime = 0;
    const interval = setInterval(() => {
      if (currentTime >= 20) {
        clearInterval(interval);
        setIsPlaying(false);
        return;
      }
      grid.forEach((row, rowIndex) => {
        const file = row[currentTime];
        if (file && !channels[rowIndex].muted) {
          const audio = new Audio(require(`./assets/${file}`));
          audioRefs.current.push(audio);
          audio.play();
        }
      });
      if (progressBarRef.current) {
        progressBarRef.current.style.left = `${(currentTime / 20) * 100}%`;
      }
      currentTime++;
    }, 1000);
  };

  const stop = () => {
    setIsPlaying(false);
    audioRefs.current.forEach((audio) => audio.pause());
    audioRefs.current = [];
    if (progressBarRef.current) {
      progressBarRef.current.style.left = "0%";
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const onDrop = (rowIndex, colIndex, file) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = file;
    setGrid(newGrid);
  };

  const onRemove = (rowIndex, colIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = null;
    setGrid(newGrid);
  };

  const moveTrack = (fromRow, fromCol, toRow, toCol) => {
    const newGrid = [...grid];
    const [movedItem] = newGrid[fromRow].splice(fromCol, 1, null);
    newGrid[toRow].splice(toCol, 1, movedItem);
    setGrid(newGrid);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="top-section">
          <ControlButtons
            play={play}
            stop={stop}
            toggleLoop={toggleLoop}
            isLooping={isLooping}
          />
          <TrackLibrary
            audioFiles={audioFiles}
            channels={channels}
            toggleMute={toggleMute}
          />
        </div>
        <div className="progress-container">
          <ProgressBar
            grid={grid}
            onDrop={onDrop}
            onRemove={onRemove}
            moveTrack={moveTrack}
          />
          <div className="progress-indicator" ref={progressBarRef}></div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
