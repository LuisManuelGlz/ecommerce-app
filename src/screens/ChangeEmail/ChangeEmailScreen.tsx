import React from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useHeaderHeight } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Controller, useForm } from 'react-hook-form';
import { Input, Text, Button } from '../../components';
import styles from './ChangeEmailScreen.styles';
import validation from './ChangeEmailValidation';
import { Colors } from '../../styles';
import { useNavigation } from '@react-navigation/native';

type FormData = {
  newEmail: string;
};

const ChangeEmailScreen = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { control, handleSubmit, errors, setValue } = useForm<FormData>();

  
  const onSubmit = ({ newEmail }: FormData) => {
    const user = auth().currentUser;
    user?.updateEmail(newEmail)
      .then(() => {
        user?.sendEmailVerification()
          .then(() => {
            setValue('newEmail', '');
            navigation.goBack();
            console.log('Email de verificación enviado a', newEmail);
          });
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
