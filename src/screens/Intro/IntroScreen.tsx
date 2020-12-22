import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../styles';
import styles from './IntroScreen.styles';
import { Text, Button } from '../../components';

const IntroScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.dark, Colors.primary]}
      start={{ x: 0.0, y: 0.7 }}
      end={{ x: 0.0, y: 1.4 }}>
      <Text.H1>Bienvenido</Text.H1>
      <Button
        style={styles.signUpButton}
        title="Regístrate"
        block
        primary
        onPress={() => navigation.navigate('SignUpStepOne')}
      />
      <Button
        style={styles.signInButton}
        title="Iniciar sesión"
        onPress={() => navigation.navigate('SignIn')}
      />
    </LinearGradient>
  );
};

export default IntroScreen;
