import React, { useContext, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { ProductsContext } from '../../context/ProductsContext';
import { ShoppingCartItem } from '../../components';
import { IProduct } from '../../interfaces/IProduct';
import { useHeaderHeight } from '@react-navigation/stack';
import styles from './ShoppingCartScreen.styles';

const ShoppingCartScreen = () => {
  const headerHeight = useHeaderHeight();
  const { productsInCart } = useContext(ProductsContext);

  useEffect(() => {
    console.log(productsInCart);
  }, []);

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <FlatList
        data={productsInCart}
        renderItem={({ item }: { item: IProduct }) => (
          <ShoppingCartItem key={item.id} product={item} />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
};

export default ShoppingCartScreen;
