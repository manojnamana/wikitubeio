// pages/api/translate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { text, targetLanguage } = req.body;

  try {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbx1xc7s3Qgw1MwI-2n6lcsEya49lyBzQUN19mPwb7D-xHg-b-UtSu_k3u_G4zXU0qMVCw/exec', {
      text,
      targetLanguage
    });

    const translatedText = response.data.translatedText;

    console.log(translatedText)
    return res.status(200).json({ translatedText });
  } catch (error) {
    console.error('Error in translation:', error);
    return res.status(500).json({ message: 'Translation failed' });
  }
}
