// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Stack } from '@mui/material';
import Link from 'next/link';
import Loading from '../loading';
import { useRouter } from 'next/router';

interface Item {
  id: string;
  name: string;
  image: string;
}

interface CarouselComponentProps {
  hrefLinkWord: string;
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ hrefLinkWord }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [waiting, setWaiting] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`/api/youtube?query=${hrefLinkWord}`);
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

    fetchVideos();
  }, [hrefLinkWord]);

  if (waiting) return <Loading />;

  return (
    <Carousel>
      {items.map((item, index) => (
        <CarouselItem key={index} item={item} hrefLinkWord={hrefLinkWord} />
      ))}
    </Carousel>
  );
};

interface CarouselItemProps {
  item: Item;
  hrefLinkWord: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ item, hrefLinkWord }) => {
  return (
    <Link href={`/tube/${item.id}?name=${item.id}/article_name= ${hrefLinkWord}`} passHref>
      <Stack>
        <img
          src={item.image}
          alt={item.name}
          style={{ maxHeight: 400, width: '100%', cursor: 'pointer' }}
        />
      </Stack>
    </Link>
  );
};

export default CarouselComponent;
