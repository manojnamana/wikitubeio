// components/Translator.tsx
import { useState } from 'react';
import axios from 'axios';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default to Spanish (es)

  const handleTranslate = async () => {
    try {
      const response = await axios.post('/api/translate', {
        text: inputText,
        targetLanguage,
      });

      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error in translation:', error);
      setTranslatedText('Translation failed');
    }
  };

  return (
    <div>
      <h1>Text Translator</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        {/* Add more languages as needed */}
      </select>
      <button onClick={handleTranslate}>Translate</button>

      {translatedText && (
        <div>
          <h2>Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Translator;
