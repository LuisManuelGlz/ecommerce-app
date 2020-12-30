import React, { createRef, useContext } from 'react';
import { View, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { Colors } from '../../styles';
import { Text, Input, Button } from '../../components';
import styles from './SignInScreen.styles';
import validation from './signInValidation';
import { AuthContext } from '../../context/AuthContext';

type FormData = {
  email: string;
  password: string;
};

const SignInScreen = () => {
  const { signIn, googleSignIn, facebookSignIn, twitterSignIn } = useContext(
    AuthContext,
  );
  const navigation = useNavigation();
  const { control, handleSubmit, errors, setValue } = useForm<FormData>();

  const emailInput = createRef<TextInput>();
  const passwordInput = createRef<TextInput>();

  const onSubmit = (formData: FormData) => {
    signIn(formData);
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
            name="email"
            rules={validation.email}
            control={control}
            defaultValue=""
            render={({ onChange, onBlur, value }) => (
              <Input
                ref={emailInput}
                returnKeyType="next"
                onSubmitEditing={() => passwordInput.current?.focus()}
                blurOnSubmit={false}
                onBlur={onBlur}
                placeholder="Escribe tu correo electrónico"
                onChangeText={(value: string) => onChange(value)}
                value={value}
                iconRight={
                  value !== '' && (
                    <Ionicons
                      onPress={() => setValue('email', '')}
                      name="close"
                      size={24}
                      color={Colors.duality}
                    />
                  )
                }
                iconOutside={
                  <Ionicons name="mail" size={24} color={Colors.light} />
                }
              />
            )}
          />
          <View>
            {errors.email && (
              <Text size="h4" color="danger">
                {errors.email.message}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text size="h5">Contraseña</Text>
          <Controller
            name="password"
            rules={validation.password}
            control={control}
            defaultValue=""
            render={({ onChange, onBlur, value }) => (
              <Input
                ref={passwordInput}
                returnKeyType="done"
                onBlur={onBlur}
                secureTextEntry
                placeholder="Escribe tu contraseña"
                onChangeText={(value: string) => onChange(value)}
                value={value}
                iconRight={
                  value !== '' && (
                    <Ionicons
                      onPress={() => setValue('password', '')}
                      name="close"
                      size={24}
                      color={Colors.duality}
                    />
                  )
                }
                iconOutside={
                  <Ionicons name="lock-closed" size={24} color={Colors.light} />
                }
              />
            )}
          />
          <View>
            {errors.password && (
              <Text size="h4" color="danger">
                {errors.password.message}
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
          onPress={() => googleSignIn()}
        />

        <Button
          style={styles.signInButton}
          background="facebook"
          block
          title="Iniciar sesión con Facebook"
          icon={
            <Ionicons name="logo-facebook" size={30} color={Colors.light} />
          }
          onPress={() => facebookSignIn()}
        />

        <Button
          style={styles.signInButton}
          background="twitter"
          block
          title="Iniciar sesión con Twitter"
          icon={<Ionicons name="logo-twitter" size={30} color={Colors.light} />}
          onPress={() => twitterSignIn()}
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
