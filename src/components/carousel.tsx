// components/CarouselComponent.tsx
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Stack } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import Loading from './loading';
import { useRouter } from 'next/router';

interface Item {
  id: number;
  name:string;
  image: string;
}

interface CarouselComponentProps {
  hrefLinkWord: string;
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ hrefLinkWord }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [waiting, setWaiting] = useState(true);
  const {article_name} = useRouter().query

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios.get(`https://wikitube-new.vercel.app/api/articles/${hrefLinkWord.toLowerCase()}/`);
        if (response.status === 200) {
          
          
          const fetchedItems: Item[] = [
            {
              id: response.data.videos[0].video_played_id,
              name:response.data.article_name,
              image: response.data.article_video_thumbnail,
            },
            
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
  }, [article_name]);

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

const CarouselItem: React.FC<CarouselItemProps> = ({ item },hrefLinkWord) => {
  return (
    <Link href={`/tube/${item.id}?name=${encodeURIComponent(item.name)}`} passHref>
      <Stack>
        <img src={item.image} alt={item.name} style={{ maxHeight: 400 }} />
      </Stack>
    </Link>
  );
};


export default CarouselComponent;
