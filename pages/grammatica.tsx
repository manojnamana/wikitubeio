import React, { useEffect, useState } from 'react';
import Soundfont from 'soundfont-player';
import './App.css';
import 'react-piano/dist/styles.css';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import GuitarComponent from './components/Guitar';


const circleColors = [
  '#ce2525',  // Red
  '#FD5F32',  // Orange
  '#F9D96A',  // Yellow
  '#1D6C3F',  // Green
  '#2BBCFD',  // Sky Blue
  '#1D47F3',  // Indigo
  '#6188E3',  // Violet
];

const chordCircles = [

  {
    name: '1 Major Scale',
    chords: [
      { name: 'C', notes: ['C4',] },
      { name: 'G', notes: ['G4',] },
      { name: 'D', notes: ['D4',] },
      { name: 'A', notes: ['A4', ] },
      { name: 'E', notes: ['E4', ] },
      { name: 'B', notes: ['B4', ] },
      { name: 'F#', notes: ['F#4', ] },
      { name: 'Db', notes: ['Db4',] },
      { name: 'Ab', notes: ['Ab4',] },
      { name: 'Eb', notes: ['Eb4',] },
      { name: 'Bb', notes: ['Bb4',] },
      { name: 'F', notes: ['F4',] },
      
    ]
  },

  {
    name: '2 Major Scale',
    chords: [
      { name: 'Dm', notes: ['D4', ] },
      { name: 'Am', notes: ['A4', ] },
      { name: 'Em', notes: ['E4', ] },
      { name: 'Bm', notes: ['B4', ] },
      { name: 'F#m', notes: ['F#4', ] },
      { name: 'C#m', notes: ['C#5', ] },
      { name: 'G#m', notes: ['G#4',] },
      { name: 'Ebm', notes: ['Eb4', ] },
      { name: 'Bbm', notes: ['Bb4',] },
      { name: 'Fm', notes: ['F4', ] },
      { name: 'Cm', notes: ['C5', ] },
      { name: 'Gm', notes: ['G4', ] }, 
    ]
  },

  {
    name: '3 Major Scale',
    chords: [
      { name: 'Em', notes: ['E4',] },
      { name: 'Bm', notes: ['B4', ] },
      { name: 'F#m', notes: ['F#4',] },
      { name: 'C#m', notes: ['C#5',] },
      { name: 'G#m', notes: ['G#4', ] },
      { name: 'D#m', notes: ['D#5',] },
      { name: 'A#m', notes: ['A#4',] },
      { name: 'Fm', notes: ['F4',] },
      { name: 'Cm', notes: ['C5', ] },
      { name: 'Gm', notes: ['G4',] },
      { name: 'Dm', notes: ['D5', ] },
      { name: 'Am', notes: ['A4',] },
    ]
  },
  
  {
    name: '4 Major Scale',
    chords: [
      { name: 'F', notes: ['F4', ] },
      { name: 'C', notes: ['C5', ] },
      { name: 'G', notes: ['G4',] },
      { name: 'D', notes: ['D5', ] },
      { name: 'A', notes: ['A4',] },
      { name: 'E', notes: ['E5',] },
      { name: 'B', notes: ['B4', ] },
      { name: 'Gb', notes: ['Gb4', ] },
      { name: 'Db', notes: ['Db5',] },
      { name: 'Ab', notes: ['Ab4', ] },
      { name: 'Eb', notes: ['Eb5', ] },
      { name: 'Bb', notes: ['Bb4',] },


    ]
  },

  {
    name: '5 Major Scale',
    chords: [
      { name: 'G', notes: ['G4',] },
      { name: 'D', notes: ['D5', ] },
      { name: 'A', notes: ['A4',] },
      { name: 'E', notes: ['E5', ] },
      { name: 'B', notes: ['B4', ] },
      { name: 'F#', notes: ['F#5', ] },
      { name: 'C#', notes: ['C#5',] },
      { name: 'Ab', notes: ['Ab4', ] },
      { name: 'Eb', notes: ['Eb5', ] },
      { name: 'Bb', notes: ['Bb4',] },
      { name: 'F', notes: ['F5',] },
      { name: 'C', notes: ['C5',] },
    ]
  },

  {
    name: '6 Major Scale',
    chords: [
      { name: 'Am', notes: ['A4',] },
      { name: 'Em', notes: ['E5',] },
      { name: 'Bm', notes: ['B4', ] },
      { name: 'F#m', notes: ['F#5', ] },
      { name: 'C#m', notes: ['C#5', ] },
      { name: 'G#m', notes: ['G#5',] },
      { name: 'D#m', notes: ['D#5',] },
      { name: 'Bbm', notes: ['Bb4',] },
      { name: 'Fm', notes: ['F5', ] },
      { name: 'Cm', notes: ['C5',] },
      { name: 'Gm', notes: ['G5', ] },
      { name: 'Dm', notes: ['D5', ] },

    ]
  },

  {
    name: '7 Major Scale',
    chords: [
      { name: 'Bdim', notes: ['B4', ] },
      { name: 'F#dim', notes: ['F#5', ] },
      { name: 'C#dim', notes: ['C#5',] },
      { name: 'G#dim', notes: ['G#5',] },
      { name: 'D#dim', notes: ['D#5', ] },
      { name: 'A#dim', notes: ['A#5', ] },
      { name: 'E#dim', notes: ['B5', ] },
      { name: 'Cdim', notes: ['C5',] },
      { name: 'Gdim', notes: ['G5', ] },
      { name: 'Ddim', notes: ['D5',] },
      { name: 'Adim', notes: ['A5', ] },
      { name: 'Edim', notes: ['E5', ] }
    ]
  },


  
];

// Function to load and play a chord using SoundFont player with adjustable volume

// const stopNote = async (midiNumber) => {
//   const note = MidiNumbers.getAttributes(midiNumber).note;
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//   const piano = await Soundfont.instrument(audioContext, 'acoustic_grand_piano');
//   piano.stop(note, audioContext.currentTime);
// };



// Function to get SVG path for each pie slice (chord segment)
const getPathForArc = (startAngle, endAngle, innerRadius, outerRadius) => {
  const x1 = outerRadius * Math.cos(startAngle);
  const y1 = outerRadius * Math.sin(startAngle);
  const x2 = outerRadius * Math.cos(endAngle);
  const y2 = outerRadius * Math.sin(endAngle);
  const x3 = innerRadius * Math.cos(endAngle);
  const y3 = innerRadius * Math.sin(endAngle);
  const x4 = innerRadius * Math.cos(startAngle);
  const y4 = innerRadius * Math.sin(startAngle);

  return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} 
         L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} z`;
};

// Function to get label position based on angle and radius
const getLabelPosition = (angle, radius) => {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return { x, y };
};



function App() {
  const [piano, setPiano] = useState(null);
  const [label, setShowLabel] = useState(false);
  const [showPiano, setShowPiano] = useState(false);
  const [isChordClicked, setIsChordClicked] = useState(false); // To 
  // const [soundProduced, setSoundProduced] = useState(true);
  const [clickedChordNotes, setClickedChordNotes] = useState([]); // Track clicked chord notes
  const [clickedSegment, setClickedSegment] = useState(null); // Track clicked segment
  const [activeChord, setActiveChord] = useState(null); // Track active chord for name display
  const [highlightedKeys, setHighlightedKeys] = useState([]); // Highlight piano keys
  const [showGuitar, setShowGuitar] = useState(false)
  const [sound, setSound] = useState('acoustic_grand_piano')

  const loadInstrument = async () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    return Soundfont.instrument(audioContext, sound);
  };

  useEffect(() => {
    loadInstrument().then(setPiano);
  }, [sound]); // Reload the instrument when the sound changes

  const playChord = (notes) => {
    if (piano) {
      piano.play(...notes, 0, { gain: 10, duration: 1 });
    }
  };

  const playNote = (midiNumber) => {
    if (piano) {
      const note = MidiNumbers.getAttributes(midiNumber).note;
      piano.play(note, 0, { gain: 10, duration: 1 });
    }
  };

  // const stopNote = (midiNumber) => {
  //   if (piano) {
  //     const note = MidiNumbers.getAttributes(midiNumber).note;
  //     piano.stop(note, 0);
  //   }
  // };
  
  const outerRadius = 250;
  const innerRadiusStep = 30;
  const numSegments = 12;
  const anglePerSegment = (2 * Math.PI) / numSegments;

  // Define the range for the piano
  const firstNote = MidiNumbers.fromNote('C4');
  const lastNote = MidiNumbers.fromNote('C6');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote,
    lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  const handleChordClick = (chord, circleIndex, chordIndex) => {
    playChord(chord.notes);
  
    setClickedChordNotes(chord.notes);
    setClickedSegment({ circleIndex, chordIndex });
    setIsChordClicked(true);
    setActiveChord(chord.name); // Set the active chord name
    setHighlightedKeys(chord.notes.map(note => MidiNumbers.fromNote(note))); // Highlight keys
  
  };
  

  return (
    <div className="text-center flex-col flex justify-center items-center">
      <h1 className="text-center text-black font-bold text-lg">Grammatica</h1>

      {/* Circle with Chords */}
      <svg style={{ maxHeight: 400, maxWidth: 500 }} viewBox="-300 -300 600 600">
        {chordCircles.map((circle, circleIndex) => {
          const innerRadius = outerRadius - innerRadiusStep * (circleIndex + 1);
          const outerRadiusForCircle = outerRadius - innerRadiusStep * circleIndex;
          const circleColor = circleColors[circleIndex % circleColors.length];

          return (
            <g key={circleIndex}>
              <circle
                cx="0"
                cy="0"
                r={innerRadius + (outerRadiusForCircle - innerRadius) / 2}
                fill="none"
                stroke="gray"
                strokeWidth="1"
              />
              {circle.chords.map((chord, index) => {
                const startAngle = index * anglePerSegment - Math.PI / 2;
                const endAngle = (index + 1) * anglePerSegment - Math.PI / 2;
                const midAngle = (startAngle + endAngle) / 2;
                const labelPos = getLabelPosition(midAngle, (innerRadius + outerRadiusForCircle) / 2);

                const isClicked = clickedSegment?.circleIndex === circleIndex && clickedSegment?.chordIndex === index;

                return (
                  <g key={`${circleIndex}-${index}`}>
                    <path
                    
                      d={getPathForArc(startAngle, endAngle, innerRadius, outerRadiusForCircle)}
                      fill={isClicked ? 'white' : circleColor} // Set white if clicked, else original color
                      stroke="black"
                      
                      onClick={() => {handleChordClick(chord, circleIndex, index);console.log("hello")}} // Handle click to change color
                    />
                    {label && (
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        fill="black"
                        fontSize="12"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                      >
                        {chord.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>


     
      {/* Piano Keyboard */}
      {showPiano && (
        <div className="my-10 xs:fixed bottom-11">
          <Piano
            noteRange={{ first: firstNote, last: lastNote }}
            playNote={(midiNumber) => {
              if (!isChordClicked) { // Only play sound if chord is not clicked
                playNote(midiNumber);
                setClickedSegment(null); // Unhighlight the chord segments
              }
            }}
            stopNote={() => {}} // No stop note logic needed
            activeNotes={clickedChordNotes.map((note) => MidiNumbers.fromNote(note))} // Highlight clicked notes// Highlight clicked notes
            width={320} 
            keyWidthToHeight={0.33}
            renderNoteLabel={({ midiNumber }) => 
              highlightedKeys.includes(midiNumber) && activeChord ? activeChord : '' // Show chord name on highlighted keys
            }
            keyboardShortcuts={keyboardShortcuts}
          />
        </div>
      )}


     {showGuitar&& <GuitarComponent/>}
      
      {/* Bottom Navigation */}
      <div style={{ bottom: 0 }} className="bg-sky-500 w-full p-2 fixed flex justify-center gap-4 align-bottom">
        {label ? (
          <button
            className="bg-white p-3 rounded-full text-slate-950 hover:bg-slate-800 hover:text-white"
            onClick={() => setShowLabel(false)}
          >
            Hide Labels
          </button>
        ) : (
          <button
            className="bg-white p-3 rounded-full text-slate-950 hover:bg-slate-800 hover:text-white"
            onClick={() => setShowLabel(true)}
          >
            Show Labels
          </button>
        )}

        {showPiano ? (
          <button
            className="bg-white p-3 rounded-full text-slate-950 hover:bg-slate-800 hover:text-white"
            onClick={() => setShowPiano(false)}
          >
            Hide Piano
          </button>
        ) : (
          <button
            className="bg-white p-3 rounded-full text-slate-950 hover:bg-slate-800 hover:text-white"
            onClick={() => {setShowPiano(true) ;setShowGuitar(false);setSound('acoustic_grand_piano')}}
          >
            Show Piano
          </button>
        )}


{showGuitar ? (
          <button
            className="bg-white p-3 rounded-full text-slate-950 hover:bg-slate-800 hover:text-white"
            onClick={() => setShowGuitar(false) }
          >
            Hide Guitar
          </button>
        ) : (
          <button
            className="bg-white p-3 rounded-full text-slate-950 hover:bg-slate-800 hover:text-white"
            onClick={() => {setShowGuitar(true); setShowPiano(false);setSound('acoustic_guitar_nylon')}}
          >
            Show Guitar
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
