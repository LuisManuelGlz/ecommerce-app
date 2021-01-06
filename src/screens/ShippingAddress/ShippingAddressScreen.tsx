import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '../../components';
import { Colors } from '../../styles';
import styles from './ShippingAddressScreen.styles';
import { ProductsContext } from '../../context/ProductsContext';
import { IShippingAddress } from '../../interfaces/IShippingAddress';
import LoadingScreen from '../LoadingScreen';

const ShippingAddressScreen = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { isLoading, shippingAddresses, fetchShippingAddresses } = useContext(
    ProductsContext,
  );

  useEffect(() => {
    fetchShippingAddresses();
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <FlatList
        data={shippingAddresses}
        renderItem={({ item }: { item: IShippingAddress }) => (
          <View key={item.id} style={styles.addressCard}>
            <View style={styles.addressCardHeader}>
              <Text size="h3">{item.fullName}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SaveShippingAddress')}>
                <Text size="h4" color="primary">
                  Editar
                </Text>
              </TouchableOpacity>
            </View>
            <Text size="h5">{item.address}</Text>
            {item.city && (
              <Text size="h5">
                {item.city}, {item.state}, {item.state} {item.postalCode},{' '}
                {item.country}
              </Text>
            )}
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
      <TouchableOpacity
        style={styles.addPaymentMethodButton}
        onPress={() => navigation.navigate('SaveShippingAddress')}>
        <Ionicons name="add" size={25} color={Colors.dark} />
      </TouchableOpacity>
    </View>
  );
};

export default ShippingAddressScreen;
