import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../styles';
import styles from './SignUpStepTwoScreen.styles';
import { Text, Input, Button } from '../../components';

const SignUpStepOneScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
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
                  <Ionicons name="close" size={24} color={Colors.duality} />
                }
                iconOutside={
                  <Ionicons name="person" size={24} color={Colors.light} />
                }
              />
            )}
            name="fullName"
            rules={{ required: true }}
            defaultValue=""
          />
          <View>
            {errors.fullName && (
              <Text size="h4" color="danger">
                El correo electrónico es requerido.
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
                  <Ionicons name="close" size={24} color={Colors.duality} />
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
            rules={{ required: true }}
            defaultValue=""
          />
          <View>
            {errors.address && (
              <Text size="h6" color="danger">
                La contraseña es requerida.
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
                  <Ionicons name="close" size={24} color={Colors.duality} />
                }
                iconOutside={
                  <Ionicons name="card" size={24} color={Colors.light} />
                }
              />
            )}
            name="cardNumber"
            rules={{ required: true }}
            defaultValue=""
          />
          <View>
            {errors.cardNumber && (
              <Text size="h4" color="danger">
                La contraseña es requerida.
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
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </LinearGradient>
  );
};

export default SignUpStepOneScreen;
