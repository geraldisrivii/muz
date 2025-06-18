// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import './tuner.css';

export default function Tuner() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(null);
  const [needleRotation, setNeedleRotation] = useState(0);
  const [note, setNote] = useState('-');

  const standardTuning = ['E', 'A', 'D', 'G', 'B', 'E'];
  const tuningFrequencies = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const bufferRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    return () => stopTuner();
  }, []);

  function startTuner() {
    setIsRunning(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        microphoneRef.current.connect(analyserRef.current);
        bufferRef.current = new Float32Array(analyserRef.current.fftSize);
        detectPitch();
      })
      .catch((error) => {
        console.error('Ошибка доступа к микрофону:', error);
        setIsRunning(false);
      });
  }

  function stopTuner() {
    setIsRunning(false);
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setCurrentFrequency(null);
    setNeedleRotation(0);
    setNote('-');
  }

  function detectPitch() {
    if (!isRunning || !analyserRef.current) return;
    analyserRef.current.getFloatTimeDomainData(bufferRef.current);
    const pitch = autoCorrelate(bufferRef.current, audioContextRef.current.sampleRate);
    if (pitch !== -1 && pitch < 5000) {
      setCurrentFrequency(pitch.toFixed(2));
      highlightClosestString(pitch);
      updateNeedle(pitch);
      setNoteFromFrequency(pitch);
    }
    animationFrameId.current = requestAnimationFrame(detectPitch);
  }

  function autoCorrelate(buffer, sampleRate) {
    let SIZE = buffer.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1;
    let bestOffset = -1;
    let bestCorrelation = 0;
    let prevCorrelation = 0;
    for (let offset = 8; offset < SIZE / 2; offset++) {
      let correlation = 0;
      for (let i = 0; i < SIZE / 2; i++) {
        correlation += buffer[i] * buffer[i + offset];
      }
      correlation /= SIZE / 2;
      if (correlation > bestCorrelation && correlation > prevCorrelation) {
        bestCorrelation = correlation;
        bestOffset = offset;
      }
      prevCorrelation = correlation;
    }
    return bestOffset > -1 ? sampleRate / bestOffset : -1;
  }

  function highlightClosestString(frequency) {
    let closestIndex = 0;
    let minDiff = Infinity;
    tuningFrequencies.forEach((freq, index) => {
      let diff = Math.abs(frequency - freq);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });
    document.querySelectorAll('.string').forEach((el, index) => {
      el.classList.toggle('highlight', index === closestIndex);
    });
  }

  function updateNeedle(frequency) {
    let closestIndex = 0;
    let minDiff = Infinity;
    tuningFrequencies.forEach((freq, index) => {
      let diff = Math.abs(frequency - freq);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });
    const diff = frequency - tuningFrequencies[closestIndex];
    setNeedleRotation(diff * 5);
  }

  function setNoteFromFrequency(frequency) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let noteIndex = Math.round(12 * Math.log2(frequency / 440)) % 12;
    if (noteIndex < 0) noteIndex += 12;
    setNote(notes[noteIndex]);
  }

  return (
    <>
      <div className="tuner-container">
        <h1>Гитарный тюнер</h1>
        <div className="tuner-display">
          <div className="gauge">
            <div
              className="needle"
              style={{
                transform: `rotate(${needleRotation}deg)`,
                transition: 'transform 0.3s ease-in-out',
              }}
            ></div>
          </div>
        </div>
        <div className="current-frequency">
          {currentFrequency ? `${currentFrequency} Hz - ${note}` : '-'}
        </div>
        <div className="buttons">
          <button onClick={startTuner} className="start">
            Старт
          </button>
          <button onClick={stopTuner} className="stop">
            Стоп
          </button>
        </div>
      </div>
    </>
  );
}

// import React, { useState, useEffect, useRef } from "react";

// const noteFrequencies = {
//   E2: 82.41,
//   A2: 110.00,
//   D3: 146.83,
//   G3: 196.00,
//   B3: 246.94,
//   E4: 329.63,
// };

// const getClosestNote = (freq) => {
//   return Object.entries(noteFrequencies).reduce((prev, curr) =>
//     Math.abs(curr[1] - freq) < Math.abs(prev[1] - freq) ? curr : prev
//   );
// };

// const Tuner = () => {
//   const [frequency, setFrequency] = useState(null);
//   const [closestNote, setClosestNote] = useState(null);
//   const [deviation, setDeviation] = useState(0);
//   const [isListening, setIsListening] = useState(false);

//   const audioContextRef = useRef(null);
//   const analyserRef = useRef(null);
//   const sourceRef = useRef(null);
//   const updateRef = useRef(null);

//   const startTuner = async () => {
//     if (isListening) return;

//     audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//     analyserRef.current = audioContextRef.current.createAnalyser();
//     analyserRef.current.fftSize = 2048;

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
//       sourceRef.current.connect(analyserRef.current);

//       setIsListening(true);
//       detectPitch();
//     } catch (err) {
//       console.error("Ошибка доступа к микрофону:", err);
//     }
//   };

//   const stopTuner = () => {
//     if (!isListening) return;

//     if (sourceRef.current) {
//       sourceRef.current.disconnect();
//     }
//     if (audioContextRef.current) {
//       audioContextRef.current.close();
//     }

//     setIsListening(false);
//     setFrequency(null);
//     setClosestNote(null);
//     setDeviation(0);
//     cancelAnimationFrame(updateRef.current);
//   };

//   const detectPitch = () => {
//     let buffer = new Float32Array(analyserRef.current.fftSize);
//     const update = () => {
//       analyserRef.current.getFloatTimeDomainData(buffer);
//       let freq = autoCorrelate(buffer, audioContextRef.current.sampleRate);
//       if (freq > 0) {
//         setFrequency(freq);
//         let [note, noteFreq] = getClosestNote(freq);
//         setClosestNote(note);
//         setDeviation(freq - noteFreq);
//       }
//       updateRef.current = requestAnimationFrame(update);
//     };
//     update();
//   };

//   const autoCorrelate = (buffer, sampleRate) => {
//     let size = buffer.length;
//     let bestOffset = -1;
//     let bestCorrelation = 0;
//     let rms = 0;

//     for (let i = 0; i < size; i++) {
//       rms += buffer[i] * buffer[i];
//     }
//     rms = Math.sqrt(rms / size);
//     if (rms < 0.01) return -1;

//     let prevCorrelation = 1;
//     for (let offset = 1; offset < size / 2; offset++) {
//       let correlation = 0;
//       for (let i = 0; i < size / 2; i++) {
//         correlation += buffer[i] * buffer[i + offset];
//       }
//       correlation /= size;
//       if (correlation > 0.9 && correlation > prevCorrelation) {
//         bestOffset = offset;
//         bestCorrelation = correlation;
//       }
//       prevCorrelation = correlation;
//     }

//     if (bestOffset > -1) {
//       return sampleRate / bestOffset;
//     }
//     return -1;
//   };

//   return (
//     <div style={{ textAlign: "center", fontFamily: "Arial", marginTop: "20px" }}>
//       <h1>🎸 Гитарный Тюнер</h1>
//       <h2>Частота: {frequency ? frequency.toFixed(2) + " Hz" : "Нет сигнала"}</h2>
//       <h2>
//         Нота: {closestNote ? closestNote : "-"}{" "}
//         {closestNote && <span>({deviation.toFixed(2)} Hz)</span>}
//       </h2>
//       <div
//         style={{
//           width: "300px",
//           height: "20px",
//           background: "#ddd",
//           margin: "10px auto",
//           position: "relative",
//           borderRadius: "5px",
//         }}
//       >
//         <div
//           style={{
//             width: "5px",
//             height: "20px",
//             background: "red",
//             position: "absolute",
//             left: `${150 + (deviation * 3)}px`,
//             transition: "left 0.1s",
//           }}
//         ></div>
//       </div>
//       <p>Попробуй настроить гитару, чтобы индикатор был по центру!</p>

//       <button
//         onClick={startTuner}
//         style={{
//           padding: "10px",
//           margin: "10px",
//           fontSize: "16px",
//           cursor: "pointer",
//           background: "green",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//         }}
//       >
//         ▶ Старт
//       </button>
//       <button
//         onClick={stopTuner}
//         style={{
//           padding: "10px",
//           margin: "10px",
//           fontSize: "16px",
//           cursor: "pointer",
//           background: "red",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//         }}
//       >
//         ⏹ Стоп
//       </button>
//     </div>
//   );
// };

// export default Tuner;
