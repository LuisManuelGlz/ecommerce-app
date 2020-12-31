import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ProductsContext } from '../../context/ProductsContext';
import { IProduct } from '../../interfaces/IProduct';

const ShoppingCartScreen = () => {
  const { productsInCart } = useContext(ProductsContext);

  useEffect(() => {
    console.log(productsInCart);
  }, []);

  return (
    <View>
    </View>
  );
};

export default ShoppingCartScreen;
