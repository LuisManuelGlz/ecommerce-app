import React, {
  Fragment,
  createRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { RouteProp, useNavigation } from '@react-navigation/native';
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
  const [isProductInWishList, setIsProductInWishList] = useState(false);
  const {
    addProductToShoppingCart,
    removeProductFromShoppingCart,
    addProductToWishList,
    removeProductFromWishList,
    productsInCart,
    productsInWishList,
  } = useContext(ProductsContext);
  const navigation = useNavigation();
  const opacity = new Animated.Value(0.5);
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = createRef<BottomSheet>();

  const renderContent = () => (
    <View
      style={{
        backgroundColor: Colors.darkKnight,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        height: 300,
      }}>
      <View
        style={{
          borderWidth: 3,
          borderRadius: 50,
          borderColor: Colors.light,
          width: 200,
        }}
      />
      <Text size="h3" style={{ textAlign: 'center' }}>
        ¿Estás seguro de que deseas remover el artículo{' '}
        <Text size="h3" color="primary">
          {product.title}
        </Text>{' '}
        de tu carrito de compras?
      </Text>
      <View>
        <Button
          title="Remover"
          background="danger"
          onPress={() => {
            onClose();
            removeProductFromShoppingCart(product.id);
            navigation.goBack();
          }}
        />
        <Button title="Cancelar" onPress={() => onClose()} />
      </View>
    </View>
  );

  const renderBackDrop = () => (
    <Animated.View
      style={{
        opacity: opacity,
        backgroundColor: '#979797',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
        onPress={onClose}
      />
    </Animated.View>
  );

  const onClose = () => {
    sheetRef.current!.snapTo(1);
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.inOut(Easing.ease),
    }).start();
    setTimeout(() => setIsOpen(false), 50);
  };

  const onOpen = () => {
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }).start();
    sheetRef.current!.snapTo(0);
    setIsOpen(true);
  };

  const onWishListPress = (product: IProduct) => {
    if (isProductInWishList) {
      removeProductFromWishList(product.id);
      setIsProductInWishList(false);
    } else {
      addProductToWishList(product);
      setIsProductInWishList(true);
    }
  };

  useEffect(() => {
    if (productsInCart.find((p: IProduct) => p.id === product.id)) {
      setIsProductInTheCart(true);
    }
    if (productsInWishList.find((p: IProduct) => p.id === product.id)) {
      setIsProductInWishList(true);
    }
  }, []);

  return (
    <>
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
              <TouchableOpacity
                style={styles.removeProductButton}
                onPress={() => onOpen()}>
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
              <TouchableOpacity
                style={
                  isProductInWishList
                    ? styles.wishListButtonOn
                    : styles.wishListButtonOff
                }
                onPress={() => onWishListPress(product)}>
                <Ionicons name="bookmark" color={Colors.light} size={30} />
              </TouchableOpacity>
            </Fragment>
          )}
        </View>
      </View>
      <BottomSheet
        ref={sheetRef}
        initialSnap={1}
        snapPoints={[300, 0]}
        borderRadius={50}
        renderContent={renderContent}
        onCloseEnd={onClose}
      />
      {isOpen && renderBackDrop()}
    </>
  );
};

export default ProductScreen;
