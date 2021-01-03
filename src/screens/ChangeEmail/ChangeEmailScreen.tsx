import React, { createRef, useContext } from 'react';
import { TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useHeaderHeight } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Controller, useForm } from 'react-hook-form';
import { Input, Text, Button } from '../../components';
import styles from './ChangeEmailScreen.styles';
import validation from './ChangeEmailValidation';
import { Colors } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { AlertContext } from '../../context/AlertContext';

type FormData = {
  newEmail: string;
};

const ChangeEmailScreen = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { alert } = useContext(AlertContext);
  const { control, handleSubmit, errors, setValue } = useForm<FormData>();

  const newEmailInput = createRef<TextInput>();

  const onSubmit = ({ newEmail }: FormData) => {
    const { currentUser } = auth();
    currentUser
      ?.updateEmail(newEmail)
      .then(() => {
        currentUser?.sendEmailVerification().then(() => {
          setValue('newEmail', '');
          navigation.goBack();
          alert(
            'success',
            'Correo actualizado',
            `Correo de verificación enviado a ${newEmail}`,
          );
        });
      })
      .catch((error) => {
        // email ya en uso
        console.log(error);
        alert('error', 'Error', 'El correo ya está en uso');
      });
  };

  return (
    <View style={[styles.container, { paddingTop: headerHeight + 30 }]}>
      <View style={styles.changeEmailContainer}>
        <Text size="h2">Cambiar correo electrónico</Text>
        <Controller
          name="newEmail"
          rules={validation.newEmail}
          control={control}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Input
              ref={newEmailInput}
              returnKeyType="done"
              style={styles.emailInput}
              onBlur={onBlur}
              onChangeText={(value: string) => onChange(value)}
              value={value}
              placeholder="Escribe tu nuevo correo electrónico"
              iconRight={
                value !== '' && (
                  <Ionicons
                    onPress={() => setValue('newEmail', '')}
                    name="close"
                    size={24}
                    color={Colors.duality}
                  />
                )
              }
            />
          )}
        />
        <View>
          {errors.newEmail && (
            <Text size="h4" color="danger">
              {errors.newEmail.message}
            </Text>
          )}
        </View>
        <Button
          style={styles.changeEmailButton}
          background="primary"
          title="Cambiar correo"
          onPress={handleSubmit(onSubmit)}
          block
        />
      </View>
      <Text style={styles.advice} size="h3">
        Si no tienes acceso a tu correo actual, por favor contáctanos a{'\n'}
        <Text style={styles.emailText} size="h3">
          ecommerce@mail.com
        </Text>
      </Text>
    </View>
  );
};

export default ChangeEmailScreen;
