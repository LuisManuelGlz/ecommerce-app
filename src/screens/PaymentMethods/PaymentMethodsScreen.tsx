import { useHeaderHeight } from '@react-navigation/stack';
import React, {
  createRef,
  Fragment,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { Easing } from 'react-native-reanimated';
import { Button, CreditCard, Input, Text } from '../../components';
import styles from './PaymentMethodsScreen.styles';
import validation from './PaymentMethodsValidation';
import { Colors } from '../../styles';
import { ProductsContext } from '../../context/ProductsContext';
import { IPaymentMethod } from '../../interfaces/IPaymentMethod';
import LoadingScreen from '../LoadingScreen';

type FormData = {
  cardName: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
};

const PaymentMethodsScreen = () => {
  const headerHeight = useHeaderHeight();
  const {
    isLoading,
    addPaymentMethod,
    paymentMethods,
    fetchPaymentMethods,
  } = useContext(ProductsContext);
  const { control, handleSubmit, errors, setValue } = useForm<FormData>();
  const opacity = new Animated.Value(0.5);
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = createRef<BottomSheet>();
  const cardNameInput = createRef<TextInput>();
  const cardNumberInput = createRef<TextInput>();
  const expirationDateInput = createRef<TextInput>();
  const cvcInput = createRef<TextInput>();

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  if (isLoading) return <LoadingScreen />;

  const onSubmit = (formData: FormData) => {
    addPaymentMethod({ ...formData });
  };

  const renderContent = () => (
    <View style={styles.renderContent}>
      <View style={styles.messageContainer} />
      <Text size="h3" style={{ textAlign: 'center' }}>
        Añadir nueva tarjeta
      </Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            inputStyle={styles.inputStyle}
            ref={cardNameInput}
            returnKeyType="next"
            onSubmitEditing={() => cardNumberInput.current?.focus()}
            blurOnSubmit={false}
            onBlur={onBlur}
            placeholder="Nombre de la tarjeta"
            onChangeText={(value: string) => onChange(value)}
            value={value}
            iconRight={
              value !== '' && (
                <Ionicons
                  onPress={() => setValue('cardName', '')}
                  name="close"
                  size={24}
                  color={Colors.duality}
                />
              )
            }
          />
        )}
        name="cardName"
        rules={validation.cardName}
        defaultValue=""
      />
      <View>
        {errors.cardName && (
          <Text size="h4" color="danger">
            {errors.cardName.message}
          </Text>
        )}
      </View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            inputStyle={styles.inputStyle}
            ref={cardNumberInput}
            returnKeyType="next"
            onSubmitEditing={() => expirationDateInput.current?.focus()}
            keyboardType="numeric"
            maxLength={16}
            blurOnSubmit={false}
            onBlur={onBlur}
            placeholder="Número de la tarjeta"
            onChangeText={(value: string) => onChange(value)}
            value={value}
            iconRight={
              value !== '' && (
                <Ionicons
                  onPress={() => setValue('cardNumber', '')}
                  name="close"
                  size={24}
                  color={Colors.duality}
                />
              )
            }
          />
        )}
        name="cardNumber"
        rules={validation.cardNumber}
        defaultValue=""
      />
      <View>
        {errors.cardNumber && (
          <Text size="h4" color="danger">
            {errors.cardNumber.message}
          </Text>
        )}
      </View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            inputStyle={styles.inputStyle}
            ref={expirationDateInput}
            returnKeyType="next"
            onSubmitEditing={() => cvcInput.current?.focus()}
            keyboardType="numeric"
            maxLength={5}
            blurOnSubmit={false}
            onBlur={onBlur}
            placeholder="Fecha de expiración"
            onChangeText={(value: string) => onChange(value)}
            value={value}
            iconRight={
              value !== '' && (
                <Ionicons
                  onPress={() => setValue('expirationDate', '')}
                  name="close"
                  size={24}
                  color={Colors.duality}
                />
              )
            }
          />
        )}
        name="expirationDate"
        rules={validation.expirationDate}
        defaultValue=""
      />
      <View>
        {errors.expirationDate && (
          <Text size="h4" color="danger">
            {errors.expirationDate.message}
          </Text>
        )}
      </View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            inputStyle={styles.inputStyle}
            ref={cvcInput}
            returnKeyType="done"
            keyboardType="numeric"
            onBlur={onBlur}
            maxLength={3}
            placeholder="CVC"
            onChangeText={(value: string) => onChange(value)}
            value={value}
            iconRight={
              value !== '' && (
                <Ionicons
                  onPress={() => setValue('cvc', '')}
                  name="close"
                  size={24}
                  color={Colors.duality}
                />
              )
            }
          />
        )}
        name="cvc"
        rules={validation.cvc}
        defaultValue=""
      />
      <View>
        {errors.cvc && (
          <Text size="h4" color="danger">
            {errors.cvc.message}
          </Text>
        )}
      </View>
      <Button
        block
        title="Añadir tarjeta"
        background="primary"
        onPress={() => {
          handleSubmit(onSubmit)();
          onClose();
        }}
      />
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
      <View style={[styles.container, { marginTop: headerHeight + 30 }]}>
        <Text size="h2" style={styles.title}>
          Tus métodos de pago
        </Text>
        <FlatList
          data={paymentMethods}
          renderItem={({ item }: { item: IPaymentMethod }) => (
            <CreditCard
              key={item.id}
              type="mastercard"
              name={item.cardName}
              date={item.expirationDate}
              suffix={item.cardNumber.substr(-4)}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
        <TouchableOpacity
          style={styles.addPaymentMethodButton}
          onPress={() => onOpen()}>
          <Ionicons name="add" size={25} color={Colors.dark} />
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={sheetRef}
        initialSnap={1}
        snapPoints={[525, 0]}
        borderRadius={50}
        renderContent={renderContent}
        onCloseEnd={onClose}
      />
      {isOpen && renderBackDrop()}
    </Fragment>
  );
};

export default PaymentMethodsScreen;
