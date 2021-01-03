import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './SearchResultItem.styles';
import Text from '../Text';
import { IProduct } from '../../interfaces/IProduct';

interface Props {
  product: IProduct;
}

const SearchResultItem = ({ product }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetails', { product })}>
      <Image style={styles.image} source={{ uri: product.images[0] }} />
      <View style={styles.details}>
        <Text size="h5">{product.title}</Text>
        <Text color="primary" size="h5">
          $ {product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultItem;
