import React, { useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import Carousel from 'react-native-snap-carousel';
import { ProductCard, Text } from '../../components';
import styles from './HomeScreen.styles';
import { ProductsContext } from '../../context/ProductsContext';
import LoadingScreen from '../LoadingScreen';

const HomeScreen = () => {
  const headerHeight = useHeaderHeight();
  const { isLoading, fetchProducts, newer, mostSold, gaming } = useContext(
    ProductsContext,
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return <ProductCard product={item} />;
  };

  if (isLoading) return <LoadingScreen />;

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
