import React, { createRef, useContext } from 'react';
import { View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Input, Text } from '../../components';
import { Colors } from '../../styles';
import styles from './SaveShippingAddressScreen.styles';
import validation from './SaveShippingAddressValidation';
import { Controller, useForm } from 'react-hook-form';
import { ProductsContext } from '../../context/ProductsContext';

type FormData = {
  fullName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

const SaveShippingAddressScreen = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { control, handleSubmit, errors, setValue } = useForm<FormData>();
  const { addShippingAddress } = useContext(ProductsContext);
  const fullNameInput = createRef<TextInput>();
  const addressInput = createRef<TextInput>();
  const cityInput = createRef<TextInput>();
  const stateInput = createRef<TextInput>();
  const postalCodeInput = createRef<TextInput>();
  const countryInput = createRef<TextInput>();

  const onSubmit = (formData: FormData) => {
    addShippingAddress(formData);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <View style={styles.fieldContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              inputStyle={styles.inputStyle}
              ref={fullNameInput}
              returnKeyType="next"
              onSubmitEditing={() => addressInput.current?.focus()}
              blurOnSubmit={false}
              onBlur={onBlur}
              placeholder="Nombre completo"
              onChangeText={(value: string) => onChange(value)}
              value={value}
              iconRight={
                value !== '' && (
                  <Ionicons
                    onPress={() => setValue('fullName', '')}
                    name="close"
                    size={24}
                    color={Colors.duality}
                  />
                )
              }
            />
          )}
          name="fullName"
          rules={validation.fullName}
          defaultValue=""
        />
        <View>
          {errors.fullName && (
            <Text size="h4" color="danger">
              {errors.fullName.message}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              inputStyle={styles.inputStyle}
              ref={addressInput}
              returnKeyType="next"
              onSubmitEditing={() => cityInput.current?.focus()}
              blurOnSubmit={false}
              onBlur={onBlur}
              placeholder="Dirección"
              onChangeText={(value: string) => onChange(value)}
              value={value}
              iconRight={
                value !== '' && (
                  <Ionicons
                    onPress={() => setValue('address', '')}
                    name="close"
                    size={24}
                    color={Colors.duality}
                  />
                )
              }
            />
          )}
          name="address"
          rules={validation.address}
          defaultValue=""
        />
        <View>
          {errors.address && (
            <Text size="h4" color="danger">
              {errors.address.message}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              inputStyle={styles.inputStyle}
              ref={cityInput}
              returnKeyType="next"
              onSubmitEditing={() => stateInput.current?.focus()}
              blurOnSubmit={false}
              onBlur={onBlur}
              placeholder="Cuidad"
              onChangeText={(value: string) => onChange(value)}
              value={value}
              iconRight={
                value !== '' && (
                  <Ionicons
                    onPress={() => setValue('city', '')}
                    name="close"
                    size={24}
                    color={Colors.duality}
                  />
                )
              }
            />
          )}
          name="city"
          rules={validation.city}
          defaultValue=""
        />
        <View>
          {errors.city && (
            <Text size="h4" color="danger">
              {errors.city.message}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              inputStyle={styles.inputStyle}
              ref={stateInput}
              returnKeyType="next"
              onSubmitEditing={() => postalCodeInput.current?.focus()}
              blurOnSubmit={false}
              onBlur={onBlur}
              placeholder="Estado"
              onChangeText={(value: string) => onChange(value)}
              value={value}
              iconRight={
                value !== '' && (
                  <Ionicons
                    onPress={() => setValue('state', '')}
                    name="close"
                    size={24}
                    color={Colors.duality}
                  />
                )
              }
            />
          )}
          name="state"
          rules={validation.state}
          defaultValue=""
        />
        <View>
          {errors.state && (
            <Text size="h4" color="danger">
              {errors.state.message}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              inputStyle={styles.inputStyle}
              ref={postalCodeInput}
              returnKeyType="next"
              onSubmitEditing={() => countryInput.current?.focus()}
              keyboardType="numeric"
              blurOnSubmit={false}
              onBlur={onBlur}
              maxLength={5}
              placeholder="Código postal"
              onChangeText={(value: string) => onChange(value)}
              value={value}
              iconRight={
                value !== '' && (
                  <Ionicons
                    onPress={() => setValue('postalCode', '')}
                    name="close"
                    size={24}
                    color={Colors.duality}
                  />
                )
              }
            />
          )}
          name="postalCode"
          rules={validation.postalCode}
          defaultValue=""
        />
        <View>
          {errors.postalCode && (
            <Text size="h4" color="danger">
              {errors.postalCode.message}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              inputStyle={styles.inputStyle}
              ref={countryInput}
              returnKeyType="done"
              onBlur={onBlur}
              placeholder="País"
              onChangeText={(value: string) => onChange(value)}
              value={value}
              iconRight={
                value !== '' && (
                  <Ionicons
                    onPress={() => setValue('country', '')}
                    name="close"
                    size={24}
                    color={Colors.duality}
                  />
                )
              }
            />
          )}
          name="country"
          rules={validation.country}
          defaultValue=""
        />
        <View>
          {errors.country && (
            <Text size="h4" color="danger">
              {errors.country.message}
            </Text>
          )}
        </View>
      </View>
      <Button
        block
        title="Guardar dirección de entrega"
        background="primary"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default SaveShippingAddressScreen;
