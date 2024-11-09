// @ts-nocheck
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Stack, Typography } from '@mui/material';
import Loading from '@/src/components/loading';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface WikipediaPageContent {
    title: string;
    content: string;
}

interface Item {
    id: string;
    name: string;
    image: string;
}

export default function Home() {
    const nav = useRouter();
    const query = nav.query.article_name;

    const [article, setArticle] = useState<WikipediaPageContent | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<Item[]>([]);
    const [waiting, setWaiting] = useState<boolean>(true);

    useEffect(() => {
        const fetchArticles = async () => {
            if (!query) return;

            try {
                const response = await axios.get<{ parse: { title: string; text: { '*': string } } }>(
                    `/api/wikipedia`,
                    { params: { query } }
                );

                const parser = new DOMParser();
                const doc = parser.parseFromString(response.data.parse.text['*'], 'text/html');

                Array.from(doc.getElementsByClassName('mw-editsection')).forEach(element => {
                    element.style.display = 'none';
                });

                const anchors = Array.from(doc.querySelectorAll('a'))
                    .filter(anchor => !/\d/.test(anchor.innerText) && anchor.innerText !== "^" && anchor.innerText.length > 4)
                    .map(anchor => anchor.innerText);

                if (anchors.length > 0) {
                    fetchVideos(anchors[0]); // Fetch videos for the first relevant link text
                }

                setArticle({
                    title: response.data.parse.title,
                    content: doc.body.innerHTML,
                });
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchVideos = async (hrefLinkWord: string) => {
            setWaiting(true);
            try {
                const response = await fetch(`/api/youtube?query=${encodeURIComponent(hrefLinkWord)}`);
                const data = await response.json();

                if (response.ok) {
                    const fetchedItems: Item[] = data.map((video: any) => ({
                        id: video.videoId,
                        name: video.title,
                        image: video.thumbnail,
                    }));
                    setItems(fetchedItems);
                } else {
                    console.error(`Error: ${response.status} - ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setWaiting(false);
            }
        };

        fetchArticles();
    }, [query]);

    return (
        <Stack>
            {loading && <Loading />}

            {article && (
                <Stack style={{ marginTop: '20px', padding: '5%' }}>
                    <Stack display={'flex'} flexDirection={{ md: "row" }} alignItems={"center"} marginBottom={3} justifyContent={'space-between'}>
                        <Stack>
                            <Typography fontWeight="bold" fontSize={30}>{article.title}</Typography>
                        </Stack>
                        <Stack>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ArrowDownwardIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Related YouTube Videos</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {waiting ? (
                                        <Typography>Loading videos...</Typography>
                                    ) : items.length > 0 ? (
                                        items.map((item) => (
                                            <Stack key={item.id} direction="row" alignItems="center" spacing={2} marginBottom={1}>
                                                <img src={item.image} alt={item.name} width="50" />
                                                <a href={`https://www.youtube.com/watch?v=${item.id}`} target="_blank" rel="noopener noreferrer">
                                                    {item.name}
                                                </a>
                                            </Stack>
                                        ))
                                    ) : (
                                        <Typography>No related YouTube videos found.</Typography>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </Stack>
                    <Stack
                        className="wikipediaContent"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    ></Stack>
                </Stack>
            )}
        </Stack>
    );
}
