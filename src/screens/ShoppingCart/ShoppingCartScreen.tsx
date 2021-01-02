import React, { createRef, useContext, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from 'reanimated-bottom-sheet';
import { ProductsContext } from '../../context/ProductsContext';
import { Button, ShoppingCartItem, Text } from '../../components';
import { IProduct } from '../../interfaces/IProduct';
import { useHeaderHeight } from '@react-navigation/stack';
import styles from './ShoppingCartScreen.styles';
import { useNavigation } from '@react-navigation/native';
import Animated, { Easing } from 'react-native-reanimated';
import { Colors } from '../../styles';

const ShoppingCartScreen = () => {
  const headerHeight = useHeaderHeight();
  const { removeProductFromShoppingCart, productsInCart } = useContext(
    ProductsContext,
  );
  const navigation = useNavigation();
  const opacity = new Animated.Value(0.5);
  const [isOpen, setIsOpen] = useState(false);
  const [productSelected, setProductSelected] = useState<IProduct>();
  const sheetRef = createRef<BottomSheet>();

  const renderContent = () => (
    <View style={styles.renderContent}>
      <View style={styles.messageContainer} />
      <Text size="h3" style={{ textAlign: 'center' }}>
        ¿Estás seguro de que deseas remover el artículo{' '}
        <Text size="h3" color="primary">
          {productSelected?.title}
        </Text>{' '}
        de tu carrito de compras?
      </Text>
      <View>
        <Button
          title="Remover"
          background="danger"
          onPress={() => {
            onClose();
            if (productSelected) {
              removeProductFromShoppingCart(productSelected.id);
            }
          }}
        />
        <Button title="Cancelar" onPress={() => onClose()} />
      </View>
    </View>
  );

  const renderBackDrop = () => (
    <Animated.View
      style={[
        styles.renderBackDrop,
        {
          opacity: opacity,
        },
      ]}>
      <TouchableOpacity style={styles.backDropTouchable} onPress={onClose} />
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

  return (
    <>
      <View style={[styles.container, { marginTop: headerHeight }]}>
        {productsInCart.length === 0 && (
          <View style={styles.noProducts}>
            <Text size="h2">No hay productos en tu carrito</Text>
            <Button
              style={{ width: 175 }}
              icon={
                <Ionicons name="chevron-back" size={25} color={Colors.light} />
              }
              title="Regresar"
              background="primary"
              onPress={() => navigation.goBack()}
            />
          </View>
        )}
        <FlatList
          data={productsInCart}
          renderItem={({ item }: { item: IProduct }) => (
            <ShoppingCartItem
              key={item.id}
              product={item}
              setProductSelected={setProductSelected}
              onRemove={onOpen}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
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

export default ShoppingCartScreen;
