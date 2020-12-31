import React, { Fragment, useContext, useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/stack';
import { Text, ImageGallery, Button } from '../../components';
import { Colors } from '../../styles';
import { MainStackParamList } from '../../navigation/MainNavigator';
import styles from './ProductDetailsScreen.styles';
import { ProductsContext } from '../../context/ProductsContext';
import { IProduct } from '../../interfaces/IProduct';

interface Props {
  route: RouteProp<MainStackParamList, 'ProductDetails'>;
}

const ProductScreen = ({ route }: Props) => {
  const { product } = route.params;
  const headerHeight = useHeaderHeight();
  const [isProductInTheCart, setIsProductInTheCart] = useState(false);
  const { addProductToShoppingCart, productsInCart } = useContext(
    ProductsContext,
  );

  useEffect(() => {
    if (productsInCart.find((p: IProduct) => p.id === product.id)) {
      setIsProductInTheCart(true);
    } else {
      setIsProductInTheCart(false);
    }
  }, []);

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <ScrollView style={{ marginBottom: 70 }}>
        <ImageGallery images={product.images} />
        <View style={styles.details}>
          <Text size="h2" color="primary">
            $ {product.price}
          </Text>
          <Text size="h2">{product.title}</Text>
          <Text size="h4">{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        {isProductInTheCart ? (
          <Fragment>
            <View style={styles.quantity}>
              <TouchableOpacity>
                <Ionicons name="remove" color={Colors.light} size={25} />
              </TouchableOpacity>
              <Text size="h2" color="primary">
                1
              </Text>
              <TouchableOpacity>
                <Ionicons name="add" color={Colors.light} size={25} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.removeProductButton}>
              <Ionicons name="close" color={Colors.light} size={30} />
            </TouchableOpacity>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              title="Añadir al carrito"
              background="primary"
              onPress={() => addProductToShoppingCart(product)}
            />
            <TouchableOpacity style={styles.wishListButton}>
              <Ionicons name="bookmark" color={Colors.light} size={30} />
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    </View>
  );
};

export default ProductScreen;
