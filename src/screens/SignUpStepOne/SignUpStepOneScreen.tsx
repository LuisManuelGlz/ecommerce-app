import React, { createRef, useContext } from 'react';
import { TextInput, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../styles';
import styles from './SignUpStepOneScreen.styles';
import validation from './signUpStepOneValidation';
import { Text, Input, SocialButton, Button } from '../../components';
import { AuthContext } from '../../context/AuthContext';

type FormData = {
  email: string;
  password: string;
};

const SignUpStepOneScreen = () => {
  const { signUpAccount, googleSignIn, facebookSignIn } = useContext(AuthContext)
  const navigation = useNavigation();
  const { control, handleSubmit, errors, setValue } = useForm<FormData>();

  const emailInput = createRef<TextInput>();
  const passwordInput = createRef<TextInput>();

  const onSubmit = (formData: FormData) => {
    signUpAccount(formData);
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.dark, Colors.primary]}
      start={{ x: 0.0, y: 0.7 }}
      end={{ x: 0.0, y: 1.4 }}>
      <Text size="h2" style={styles.title}>
        Regístrate usando
      </Text>

      <View style={styles.socialButtonsContainer}>
        <SocialButton
          background="google"
          icon={<Ionicons name="logo-google" size={50} color={Colors.light} />}
          onPress={() => googleSignIn()}
        />
        <SocialButton
          background="facebook"
          icon={
            <Ionicons
              style={{ marginLeft: -5 }}
              name="logo-facebook"
              size={70}
              color={Colors.facebook}
            />
          }
          onPress={() => facebookSignIn()}
        />
        <SocialButton
          background="twitter"
          icon={<Ionicons name="logo-twitter" size={40} color={Colors.light} />}
        />
      </View>

      <View style={styles.divider}>
        <View style={styles.lineHorizontal} />
        <Text size="h6">O usando tu correo</Text>
        <View style={styles.lineHorizontal} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text size="h5">Correo</Text>
          <Controller
            control={control}
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
              />
            )}
            name="email"
            rules={validation.email}
            defaultValue=""
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
            control={control}
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
              />
            )}
            name="password"
            rules={validation.password}
            defaultValue=""
          />
          <View>
            {errors.password && (
              <Text size="h4" color="danger">
                {errors.password.message}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.checkBoxFieldContainer}>
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <CheckBox
                tintColors={{ true: Colors.primary, false: Colors.light }}
                value={value}
                onValueChange={(value: boolean) => onChange(value)}
              />
            )}
            name="terms"
            rules={{ required: true }}
            defaultValue={false}
          />
          <Text size="h6">
            Acepto los{' '}
            <Text
              size="h6"
              color="primary"
              onPress={() => console.log('Terms')}>
              Términos y condiciones
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          background="primary"
          block
          title="Continuar"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <Text size="h6" style={styles.goToSignInText}>
        Ya tienes una cuenta{' '}
        <Text
          size="h6"
          color="primary"
          onPress={() => navigation.navigate('SignIn')}>
          Inicia sesión aquí
        </Text>
      </Text>
    </LinearGradient>
  );
};

export default SignUpStepOneScreen;
