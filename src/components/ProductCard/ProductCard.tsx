import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Text from '../Text';
import Button from '../Button';
import { IProduct } from '../../interfaces/IProduct';
import styles from './ProductCard.styles';

interface Props {
  product: IProduct;
  index?: number;
}

const ProductCard = ({ product, index }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetails', { product })}
      >
      <Image style={styles.image} source={{ uri: product.images[0] }} />
      <View style={styles.footerContainer}>
        <Text style={styles.title} size="h5">{product.title}</Text>
        <View style={styles.footer}>
          <Text size="h3">{product.price}</Text>
          <Button
            style={styles.button}
            background="primary"
            title="Agregar al carrito"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
