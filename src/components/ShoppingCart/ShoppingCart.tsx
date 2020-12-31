import React, { useContext } from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ShoppingCart.styles';
import Text from '../Text';
import { Colors } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { ProductsContext } from '../../context/ProductsContext';

const ShoppingCart = () => {
  const { productsInCart } = useContext(ProductsContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.icon}
        name="cart"
        color={Colors.primary}
        size={30}
        onPress={() => navigation.navigate('ShoppingCart')}
      />
      {productsInCart.length > 0 && (
        <View style={styles.badge}>
          <Text size="h5">{productsInCart.length}</Text>
        </View>
      )}
    </View>
  );
};

export default ShoppingCart;
