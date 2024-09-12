// components/CarouselComponent.tsx
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Stack } from '@mui/material';
import Link from 'next/link';

interface Item {
  name: string;
  image: string;
}

const items: Item[] = [
  {
    name: 'Item 1',
    image: '/static/images/intro.jpg',
  },
  {
    name: 'Item 2',
    image: '/static/images/video-placeholder.jpg',
  },
  {
    name: 'Item 3',
    image: '/static/images/video-placeholder.jpg',
  },
  {
    name: 'Item 4',
    image: '/static/images/video-placeholder.jpg',
  },
  {
    name: 'Item 5',

    image: '/static/images/video-placeholder.jpg',
  },
];

const CarouselComponent: React.FC = () => {
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
    <Link href='/player'>
    <Stack>
      <img src={item.image} alt={item.name} style={{maxHeight:400}}/>   
    </Stack>
    </Link>
  );
};

export default CarouselComponent;
