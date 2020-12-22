import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import { Colors } from '../../styles';
import { Text, Input, Button } from '../../components';
import styles from './SignInScreen.styles';

const SignInScreen = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        console.log('Signed in!');
      })
      .catch((error) => {
        // if (error.code === 'auth/email-already-in-use') {
        //   console.log('That email address is already in use!');
        // }

        // if (error.code === 'auth/invalid-email') {
        //   console.log('That email address is invalid!');
        // }

        console.error(error);
      });
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.dark, Colors.primary]}
      start={{ x: 0.0, y: 0.7 }}
      end={{ x: 0.0, y: 1.4 }}>
      <Text size="h2" style={styles.title}>
        Bienvenido
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text size="h5">Correo</Text>
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
              <Text size="h4" color="danger">
                El correo electrónico es requerido.
              </Text>
            )}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text size="h5">Contraseña</Text>
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
              <Text size="h4" color="danger">
                La contraseña es requerida.
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          style={styles.signInButton}
          background="primary"
          block
          title="Iniciar sesión"
          onPress={handleSubmit(onSubmit)}
        />

        <Button
          style={styles.signInButton}
          background="google"
          block
          title="Iniciar sesión con Google"
          icon={<Ionicons name="logo-google" size={30} color={Colors.light} />}
        />

        <Button
          style={styles.signInButton}
          background="facebook"
          block
          title="Iniciar sesión con Facebook"
          icon={
            <Ionicons name="logo-facebook" size={30} color={Colors.light} />
          }
        />

        <Button
          style={styles.signInButton}
          background="twitter"
          block
          title="Iniciar sesión con Twitter"
          icon={<Ionicons name="logo-twitter" size={30} color={Colors.light} />}
        />
      </View>

      <Text size="h6" style={styles.goToSignUpText}>
        No tienes una cuenta{' '}
        <Text
          size="h6"
          color="primary"
          onPress={() => navigation.navigate('SignUpStepOne')}>
          Regístrate aquí
        </Text>
      </Text>
    </LinearGradient>
  );
};

export default SignInScreen;
