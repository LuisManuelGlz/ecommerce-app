import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import styles from './PaymentScreen.styles';

const PaymentScreen = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { personalDetails } = useContext(AuthContext);

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <Text size="h2">Dirección de envío</Text>
      <View style={styles.addressCard}>
        <View style={styles.addressCardHeader}>
          <Text size="h5">{personalDetails.fullName}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ShippingAddress')}>
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
      <Text size="h4">Método de envío</Text>
      <View style={styles.sumContainer}>
        <View style={styles.sum}>
          <Text size="h4">Orden:</Text>
          <Text size="h4">$ 123</Text>
        </View>
        <View style={styles.sum}>
          <Text size="h4">Envío:</Text>
          <Text size="h4">$ 123</Text>
        </View>
        <View style={styles.sum}>
          <Text size="h4">Sumatoria (Total):</Text>
          <Text size="h4">$ 246</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button block title="Confirmar compra" background="primary" />
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;
