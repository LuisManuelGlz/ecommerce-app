import React, { createRef, useContext } from 'react';
import { TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useHeaderHeight } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Controller, useForm } from 'react-hook-form';
import { Input, Text, Button } from '../../components';
import styles from './ChangePasswordScreen.styles';
import validation from './ChangePasswordValidation';
import { Colors } from '../../styles';
import { AlertContext } from '../../context/AlertContext';

type FormData = {
  currentPassword: string;
  newPassword: string;
};

const ChangePasswordScreen = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { alert } = useContext(AlertContext);
  const { control, handleSubmit, errors, setValue } = useForm<FormData>();

  const currentPasswordInput = createRef<TextInput>();
  const newPasswordInput = createRef<TextInput>();

  const onSubmit = ({ currentPassword, newPassword }: FormData) => {
    const reauthenticate = (currentPassword: string) => {
      const { currentUser } = auth();
      const credential = auth.EmailAuthProvider.credential(
        currentUser!.email!,
        currentPassword,
      );
      return currentUser!.reauthenticateWithCredential(credential);
    };

    reauthenticate(currentPassword)
      .then(() => {
        const { currentUser } = auth();
        currentUser
          ?.updatePassword(newPassword)
          .then(() => {
            navigation.goBack();
            alert(
              'success',
              'Contraseña actualizada',
              'Tu contraseña ha sido actualizada correctamente',
            );
          })
          .catch((error) => {
            console.log(error);
            alert('error', 'Oops!', 'Algo salió mal');
          });
      })
      .catch((error) => {
        console.log(error);
        alert('error', 'Oops!', 'La contraseña actual es incorrecta');
      });
  };

  return (
    <View style={[styles.container, { paddingTop: headerHeight + 30 }]}>
      <Text size="h2">Cambiar contraseña</Text>

      <View style={styles.passwordField}>
        <Text size="h5">Contraseña actual</Text>
        <Controller
          name="currentPassword"
          rules={validation.currentPassword}
          control={control}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Input
              ref={currentPasswordInput}
              returnKeyType="next"
              onSubmitEditing={() => newPasswordInput.current?.focus()}
              blurOnSubmit={false}
              style={styles.passwordInput}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={(value: string) => onChange(value)}
              value={value}
              placeholder="Escribe tu contraseña actual"
              iconRight={
                value !== '' && (
                  <Ionicons
                    onPress={() => setValue('currentPassword', '')}
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
          {errors.currentPassword && (
            <Text size="h4" color="danger">
              {errors.currentPassword.message}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.passwordField}>
        <Text size="h5">Contraseña nueva</Text>
        <Controller
          name="newPassword"
          rules={validation.newPassword}
          control={control}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Input
              ref={newPasswordInput}
              returnKeyType="done"
              style={styles.passwordInput}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={(value: string) => onChange(value)}
              value={value}
              placeholder="Escribe tu contraseña nueva"
              iconRight={
                value !== '' && (
                  <Ionicons
                    onPress={() => setValue('newPassword', '')}
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
          {errors.newPassword && (
            <Text size="h4" color="danger">
              {errors.newPassword.message}
            </Text>
          )}
        </View>
      </View>

      <Button
        style={styles.changePasswordButton}
        onPress={handleSubmit(onSubmit)}
        background="primary"
        title="Cambiar contraseña"
        block
      />
    </View>
  );
};

export default ChangePasswordScreen;
