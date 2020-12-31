import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Text from '../Text';
import Button from '../Button';
import { IProduct } from '../../interfaces/IProduct';
import styles from './ProductCard.styles';
import { ProductsContext } from '../../context/ProductsContext';

interface Props {
  product: IProduct;
  index?: number;
}

const ProductCard = ({ product, index }: Props) => {
  const navigation = useNavigation();
  const { addProductToShoppingCart } = useContext(ProductsContext);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetails', { product })}>
      <Image style={styles.image} source={{ uri: product.images[0] }} />
      <View style={styles.footerContainer}>
        <Text style={styles.title} size="h5">
          {product.title}
        </Text>
        <View style={styles.footer}>
          <Text size="h3">{product.price}</Text>
          <Button
            style={styles.button}
            background="primary"
            title="Agregar al carrito"
            onPress={() => addProductToShoppingCart(product)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
