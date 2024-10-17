import React, { useEffect, useState } from 'react';

interface TranscriptProps {
  transcript: string;
  videoDuration: number; // in seconds
}

const Transcript: React.FC<TranscriptProps> = ({ transcript, videoDuration }) => {
  const [transcriptWithTimestamps, setTranscriptWithTimestamps] = useState<
    { timestamp: string; text: string }[]
  >([]);

  useEffect(() => {
    const generateTimestamps = () => {
      const sentences = transcript.split('. '); // Split transcript by sentences or other markers
      const sentenceCount = sentences.length;
      const secondsPerSentence = videoDuration / sentenceCount;

      const formattedTranscript = sentences.map((sentence, index) => {
        const currentTimeInSeconds = Math.floor(index * secondsPerSentence);
        const minutes = Math.floor(currentTimeInSeconds / 60);
        const seconds = currentTimeInSeconds % 60;

        const formattedTimestamp = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        return { timestamp: formattedTimestamp, text: sentence.trim() };
      });

      setTranscriptWithTimestamps(formattedTranscript);
    };

    generateTimestamps();
  }, [transcript, videoDuration]);

  return (
    <div>
      {transcriptWithTimestamps.map(({ timestamp, text }, index) => (
        <p key={index}>
          <strong>{timestamp}</strong>: {text}
        </p>
      ))}
    </div>
  );
};

// Example usage:
const ExampleComponent = () => {
  const transcript = `Hello and welcome. So this will be a brand new playlist...`;
  const videoDuration = 600; // 10 minutes in seconds

  return <Transcript transcript={transcript} videoDuration={videoDuration} />;
};

export default ExampleComponent;
