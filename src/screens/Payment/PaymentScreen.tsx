import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text } from '../../components';
import { AlertContext } from '../../context/AlertContext';
import { AuthContext } from '../../context/AuthContext';
import { ProductsContext } from '../../context/ProductsContext';
import styles from './PaymentScreen.styles';

const PaymentScreen = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { personalDetails } = useContext(AuthContext);
  const { shoppingCartTotal, orderProducts } = useContext(ProductsContext);
  const { alert } = useContext(AlertContext);

  const handleConfirmPurchase = () => {
    orderProducts();
    alert('success', 'Compra exitosa', 'Tu compra ha sido realizada con éxito');
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <Text size="h2">Dirección de envío</Text>
      <View style={styles.addressCard}>
        <View style={styles.addressCardHeader}>
          <Text size="h5">{personalDetails.fullName}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ShippingAddress')}>
            <Text size="h4" color="primary">
              Cambiar
            </Text>
          </TouchableOpacity>
        </View>
        <Text size="h5">{personalDetails.address}</Text>
      </View>
      <View style={styles.creditCard}>
        <View style={styles.creditCardHeader}>
          <Text size="h5">Método de pago</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('PaymentMethods')}>
            <Text size="h4" color="primary">
              Cambiar
            </Text>
          </TouchableOpacity>
        </View>
        <Text size="h5">
          **** **** **** {personalDetails.cardNumber.substr(-4)}
        </Text>
      </View>
      {/* <Text size="h4">Método de envío</Text> */}
      <View style={styles.sumContainer}>
        <View style={styles.sum}>
          <Text size="h4">Orden:</Text>
          <Text size="h4">$ {Math.ceil(shoppingCartTotal)}</Text>
        </View>
        <View style={styles.sum}>
          <Text size="h4">Envío:</Text>
          <Text size="h4">$ 123</Text>
        </View>
        <View style={styles.sum}>
          <Text size="h4">Sumatoria (Total):</Text>
          <Text size="h4">$ {Math.ceil(shoppingCartTotal) + 123}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            block
            title="Confirmar compra"
            background="primary"
            onPress={() => handleConfirmPurchase()}
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;
