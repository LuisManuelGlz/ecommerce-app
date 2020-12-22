import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { Colors } from '../../styles';
import { Text, Input, Button } from '../../components';
import styles from './SignInScreen.styles';

const SignInScreen = () => {
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
      <Text.H2 style={styles.title}>Bienvenido</Text.H2>

      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text.H5>Correo</Text.H5>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                onBlur={onBlur}
                placeholder="Escribe tu correo electrónico"
                onChangeText={(value: string) => onChange(value)}
                value={value}
                iconRight={
                  <Ionicons name="close" size={24} color={Colors.duality} />
                }
                iconOutside={
                  <Ionicons name="mail" size={24} color={Colors.light} />
                }
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          <View>
            {errors.email && (
              <Text.H4 danger>El correo electrónico es requerido.</Text.H4>
            )}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text.H5>Contraseña</Text.H5>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                onBlur={onBlur}
                secureTextEntry
                placeholder="Escribe tu contraseña"
                onChangeText={(value: string) => onChange(value)}
                value={value}
                iconRight={
                  <Ionicons name="close" size={24} color={Colors.duality} />
                }
                iconOutside={
                  <Ionicons name="lock-closed" size={24} color={Colors.light} />
                }
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          <View>
            {errors.password && (
              <Text.H4 danger>La contraseña es requerida.</Text.H4>
            )}
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          style={styles.signInButton}
          primary
          block
          title="Iniciar sesión"
          onPress={handleSubmit(onSubmit)}
        />

        <Button
          style={styles.signInButton}
          google
          block
          title="Iniciar sesión con Google"
          icon={<Ionicons name="logo-google" size={30} color={Colors.light} />}
        />

        <Button
          style={styles.signInButton}
          facebook
          block
          title="Iniciar sesión con Facebook"
          icon={
            <Ionicons name="logo-facebook" size={30} color={Colors.light} />
          }
        />

        <Button
          style={styles.signInButton}
          twitter
          block
          title="Iniciar sesión con Twitter"
          icon={<Ionicons name="logo-twitter" size={30} color={Colors.light} />}
        />
      </View>

      <Text.H6 style={styles.goToSignUpText}>
        No tienes una cuenta{' '}
        <Text.H6 primary onPress={() => navigation.navigate('SignUpStepOne')}>
          Regístrate aquí
        </Text.H6>
      </Text.H6>
    </LinearGradient>
  );
};

export default SignInScreen;
