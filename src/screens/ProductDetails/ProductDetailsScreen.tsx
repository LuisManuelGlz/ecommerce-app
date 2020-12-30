import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/stack';
import { Text, ImageGallery, Button } from '../../components';
import { Colors } from '../../styles';
import { MainStackParamList } from '../../navigation/MainNavigator';
import styles from './ProductDetailsScreen.styles';

interface Props {
  route: RouteProp<MainStackParamList, 'ProductDetails'>;
}

const ProductScreen = ({ route }: Props) => {
  const { product } = route.params;
  const headerHeight = useHeaderHeight();

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <ImageGallery images={product.images} />
      <View style={styles.details}>
        <Text size="h2" color="primary">
          {product.price}
        </Text>
        <Text size="h2">{product.title}</Text>
        <Text size="h4">{product.description}</Text>
      </View>
      <View style={styles.footer}>
        <Button title="Añadir al carrito" background="primary" />
        <TouchableOpacity style={styles.wishListButton}>
          <Ionicons name="bookmark" color={Colors.light} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductScreen;
