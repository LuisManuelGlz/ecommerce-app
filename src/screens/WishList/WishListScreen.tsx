import React, { createRef, Fragment, useContext, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { ProductsContext } from '../../context/ProductsContext';
import { Button, WishListItem, Text } from '../../components';
import { IProduct } from '../../interfaces/IProduct';
import { useHeaderHeight } from '@react-navigation/stack';
import styles from './WishList.styles';
import Animated, { Easing } from 'react-native-reanimated';

const WishListScreen = () => {
  const headerHeight = useHeaderHeight();
  const { removeProductFromWishList, productsInWishList } = useContext(
    ProductsContext,
  );
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
              removeProductFromWishList(productSelected.id);
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
    <Fragment>
      <View style={[styles.container, { marginTop: headerHeight }]}>
        {productsInWishList.length === 0 && (
          <View style={styles.noProducts}>
            <Text size="h2">Tu lista de deseos está vacía</Text>
          </View>
        )}
        <FlatList
          data={productsInWishList}
          renderItem={({ item }: { item: IProduct }) => (
            <WishListItem
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
    </Fragment>
  );
};

export default WishListScreen;
