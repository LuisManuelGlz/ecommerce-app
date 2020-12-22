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
      <Text.H2 style={styles.title}>Detalles personales</Text.H2>

      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text.H5>Nombre completo</Text.H5>
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
              <Text.H4 danger>El correo electrónico es requerido.</Text.H4>
            )}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text.H5>Dirección</Text.H5>
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
              <Text.H4 danger>La contraseña es requerida.</Text.H4>
            )}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text.H5>Número de tarjeta</Text.H5>
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
              <Text.H4 danger>La contraseña es requerida.</Text.H4>
            )}
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          primary
          block
          title="Regístrate con nosotros"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </LinearGradient>
  );
};

export default SignUpStepOneScreen;
