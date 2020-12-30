import React from 'react';
import { useHeaderHeight } from '@react-navigation/stack';
import Carousel from 'react-native-snap-carousel';
import { ScrollView } from 'react-native';
import { ProductCard, Text } from '../../components';
import styles from './HomeScreen.styles';
import { IProduct } from '../../interfaces/IProduct';

const HomeScreen = () => {
  const headerHeight = useHeaderHeight();

  const entries = [
    {
      title: 'Beautiful and dramatic Antelope Canyon',
      description: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      price: '$99.99',
      images: [
        'https://i.imgur.com/UYiroysl.jpg',
        'https://i.imgur.com/UPrs1EWl.jpg',
        'https://i.imgur.com/MABUbpDl.jpg',
      ],
    },
    {
      title: 'Earlier this morning, NYC',
      description: 'Lorem ipsum dolor sit amet',
      price: '$99.99',
      images: [
        'https://i.imgur.com/UPrs1EWl.jpg',
        'https://i.imgur.com/UYiroysl.jpg',
        'https://i.imgur.com/MABUbpDl.jpg',
      ],
    },
    {
      title: 'White Pocket Sunset',
      description: 'Lorem ipsum dolor sit amet et nuncat ',
      price: '$99.99',
      images: [
        'https://i.imgur.com/MABUbpDl.jpg',
        'https://i.imgur.com/UYiroysl.jpg',
        'https://i.imgur.com/UPrs1EWl.jpg',
      ],
    },
  ];

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return <ProductCard product={item} />;
  };

  return (
    <ScrollView style={[styles.container, { marginTop: headerHeight }]}>
      <Text style={styles.sectionTitle} size="h2">
        Lo más vendido
      </Text>
      <Carousel
        data={entries}
        renderItem={_renderItem}
        sliderWidth={450}
        itemWidth={300}
      />
      <Text style={styles.sectionTitle} size="h2">
        Mouses
      </Text>
      <Carousel
        data={entries}
        renderItem={_renderItem}
        sliderWidth={450}
        itemWidth={300}
      />
      <Text style={styles.sectionTitle} size="h2">
        Audífonos
      </Text>
      <Carousel
        data={entries}
        renderItem={_renderItem}
        sliderWidth={450}
        itemWidth={300}
      />
    </ScrollView>
  );
};

export default HomeScreen;
