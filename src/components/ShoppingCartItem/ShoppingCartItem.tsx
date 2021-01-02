import React, { Dispatch } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from './ShoppingCartItem.styles';
import Text from '../Text';
import { IProduct } from '../../interfaces/IProduct';
import { Colors } from '../../styles';

interface Props {
  product: IProduct;
  onRemove: () => void;
  setProductSelected: Dispatch<React.SetStateAction<IProduct | undefined>>;
}

const ShoppingCartItem = ({ product, onRemove, setProductSelected }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetails', { product })}>
      <View style={styles.quantity}>
        <TouchableOpacity>
          <Ionicons name="add" color={Colors.light} size={15} />
        </TouchableOpacity>
        <Text>1</Text>
        <TouchableOpacity>
          <Ionicons name="remove" color={Colors.light} size={15} />
        </TouchableOpacity>
      </View>
      <Image style={styles.image} source={{ uri: product.images[0] }} />
      <View style={styles.details}>
        <Text size="h5">{product.title}</Text>
        <Text color="primary" size="h5">
          $ {product.price}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          setProductSelected(product);
          onRemove();
        }}>
        <Ionicons name="close" color={Colors.light} size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ShoppingCartItem;
