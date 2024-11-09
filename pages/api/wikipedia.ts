
// pages/api/wikipedia.ts
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface WikipediaPageContentResponse {
    parse: {
        title: string;
        text: {
            '*': string;
        };
    };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req.query;

    if (typeof query !== 'string' || !query) {
        return res.status(400).json({ error: 'Please provide a valid search term' });
    }

    try {
        // First, get the full article content
        const response = await axios.get<WikipediaPageContentResponse>(`https://en.wikipedia.org/w/api.php`, {
            params: {
                action: 'parse',
                page: query,   // Page title to fetch
                format: 'json',
                prop: 'text',  // Include page content HTML
            },
        });

        res.status(200).json(response.data);
        // console.log(res.status(200).json(response.data))

    } catch (error) {
        res.status(500).json({ error: 'Error fetching article content from Wikipedia' });
        
    }
}
