import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import Carousel from 'react-native-snap-carousel';
import { ProductCard, Text } from '../../components';
import styles from './HomeScreen.styles';
import { IProduct } from '../../interfaces/IProduct';
import { ProductsContext } from '../../context/ProductsContext';

const HomeScreen = () => {
  const headerHeight = useHeaderHeight();
  const { fetchProducts, newer, mostSold, gaming } = useContext(ProductsContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const products = [
    {
      title: 'Beautiful and dramatic Antelope Canyon',
      description:
        'Lorem ipsum dolor sit amet et nuncat mergitur Lorem ipsum dolor sit amet et nuncat mergitur Lorem ipsum dolor sit amet et nuncat mergitur',
      price: '$99.99',
      images: [
        'https://i.imgur.com/UYiroysl.jpg',
        'https://i.imgur.com/UPrs1EWl.jpg',
        'https://i.imgur.com/MABUbpDl.jpg',
      ],
    },
    {
      title: 'Earlier this morning, NYC',
      description:
        'Lorem ipsum dolor sit amet et nuncat mergitur Lorem ipsum dolor sit amet et nuncat mergitur Lorem ipsum dolor sit amet et nuncat mergitur',
      price: '$99.99',
      images: [
        'https://i.imgur.com/UPrs1EWl.jpg',
        'https://i.imgur.com/UYiroysl.jpg',
        'https://i.imgur.com/MABUbpDl.jpg',
      ],
    },
    {
      title: 'White Pocket Sunset',
      description:
        'Lorem ipsum dolor sit amet et nuncat mergitur Lorem ipsum dolor sit amet et nuncat mergitur Lorem ipsum dolor sit amet et nuncat mergitur',
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
        data={mostSold}
        renderItem={_renderItem}
        sliderWidth={450}
        itemWidth={300}
      />
      <Text style={styles.sectionTitle} size="h2">
        Novedades
      </Text>
      <Carousel
        data={newer}
        renderItem={_renderItem}
        sliderWidth={450}
        itemWidth={300}
      />
      <Text style={styles.sectionTitle} size="h2">
        Gaming
      </Text>
      <Carousel
        data={gaming}
        renderItem={_renderItem}
        sliderWidth={450}
        itemWidth={300}
      />
    </ScrollView>
  );
};

export default HomeScreen;
