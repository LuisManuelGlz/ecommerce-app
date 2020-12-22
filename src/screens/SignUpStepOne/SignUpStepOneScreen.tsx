import React from 'react';
import { View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../styles';
import styles from './SignUpStepOneScreen.styles';
import { Text, Input, SocialButton, Button } from '../../components';

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
      <Text.H2 style={styles.title}>Regístrate usando</Text.H2>

      <View style={styles.socialButtonsContainer}>
        <SocialButton
          google
          icon={<Ionicons name="logo-google" size={50} color={Colors.light} />}
        />
        <SocialButton
          facebook
          icon={
            <Ionicons
              style={{ marginLeft: -5 }}
              name="logo-facebook"
              size={70}
              color={Colors.facebook}
            />
          }
        />
        <SocialButton
          twitter
          icon={<Ionicons name="logo-twitter" size={40} color={Colors.light} />}
        />
      </View>

      <View style={styles.divider}>
        <View style={styles.lineHorizontal} />
        <Text.H6>O usando tu correo</Text.H6>
        <View style={styles.lineHorizontal} />
      </View>

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
          <Text.H6>
            Acepto los{' '}
            <Text.H6 primary onPress={() => console.log('Terms')}>
              Términos y condiciones
            </Text.H6>
          </Text.H6>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          primary
          block
          title="Continuar"
          onPress={() => navigation.navigate('SignUpStepTwo')}
        />
      </View>

      <Text.H6 style={styles.goToSignInText}>
        Ya tienes una cuenta{' '}
        <Text.H6 primary onPress={() => navigation.navigate('SignIn')}>
          Inicia sesión aquí
        </Text.H6>
      </Text.H6>
    </LinearGradient>
  );
};

export default SignUpStepOneScreen;
