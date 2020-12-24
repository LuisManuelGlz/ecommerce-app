import React, { useContext } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../styles';
import styles from './SignUpStepTwoScreen.styles';
import validation from './signUpStepTwoValidation';
import { Text, Input, Button } from '../../components';
import { AuthContext } from '../../context';

type FormData = {
  fullName: string;
  address: string;
  cardNumber: string;
};

const SignUpStepOneScreen = () => {
  const { user } = useContext(AuthContext);
  const { control, handleSubmit, errors, setValue } = useForm<FormData>();

  const onSubmit = (userDetails: FormData) => {
    firestore()
      .collection('users')
      .doc(user?.uid)
      .set({
        ...userDetails,
        avatar:
          'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.dark, Colors.primary]}
      start={{ x: 0.0, y: 0.7 }}
      end={{ x: 0.0, y: 1.4 }}>
      <Text size="h2" style={styles.title}>
        Detalles personales
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text size="h5">Nombre completo</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                onBlur={onBlur}
                placeholder="Escribe tu nombre completo"
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
                iconOutside={
                  <Ionicons name="person" size={24} color={Colors.light} />
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
          <Text size="h5">Dirección</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                onBlur={onBlur}
                placeholder="Escribe tu dirección"
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
                iconOutside={
                  <Ionicons
                    name="location-sharp"
                    size={24}
                    color={Colors.light}
                  />
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
          <Text size="h5">Número de tarjeta</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                onBlur={onBlur}
                keyboardType="numeric"
                maxLength={16}
                placeholder="Escribe tu número de tarjeta"
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
                iconOutside={
                  <Ionicons name="card" size={24} color={Colors.light} />
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
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          background="primary"
          block
          title="Regístrate con nosotros"
          onPress={handleSubmit(onSubmit)}
        />
        <Button
          style={styles.returnButton}
          title="Regresar"
          onPress={() => {
            auth().signOut();
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default SignUpStepOneScreen;
