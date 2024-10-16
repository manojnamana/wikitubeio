// pages/api/translate.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ message: 'Text and target language are required' });
  }

  try {
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'fr', // Assuming source language is English; you can make this dynamic
        target: targetLang,
        format: 'text',
      }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      return res.status(500).json({ message: 'Translation error', error: data });
    }

    const translatedText = data.translatedText;

    res.status(200).json({ translatedText });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}
