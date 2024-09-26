// components/CarouselComponent.tsx
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Stack } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import Loading from './loading';

interface Item {
  name: string;
  image: string;
}

const CarouselComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios.get(`https://wikitubeio-backend.vercel.app/api/articles/calculus/`);
        if (response.status === 200) {
          const fetchedItems: Item[] = [
            {
              name: response.data.article_name,
              image: response.data.article_video_thumbnail,
            },
            // {
            //   name: 'Item 2',
            //   image: '/static/images/video-placeholder.jpg',
            // },
            // {
            //   name: 'Item 3',
            //   image: '/static/images/video-placeholder.jpg',
            // },
            // {
            //   name: 'Item 4',
            //   image: '/static/images/video-placeholder.jpg',
            // },
            // {
            //   name: 'Item 5',
            //   image: '/static/images/video-placeholder.jpg',
            // },
          ];
          setItems(fetchedItems);
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setWaiting(false);
      }
    };

    fetching();
  }, []);

  if (waiting) return <Loading />;

  return (
    <Carousel>
      {items.map((item, index) => (
        <CarouselItem key={index} item={item} />
      ))}
    </Carousel>
  );
};

interface CarouselItemProps {
  item: Item;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  return (
    <Link href={`/tube/${item.name}`} passHref>
      <Stack>
        <img src={item.image} alt={item.name} style={{ maxHeight: 400 }} />
      </Stack>
    </Link>
  );
};

export default CarouselComponent;
