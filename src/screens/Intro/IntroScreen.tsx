import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../styles';
import styles from './IntroScreen.styles';
import { Text, Button } from '../../components';

const IntroScreen = () => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.dark, Colors.primary]}
      start={{ x: 0.0, y: 0.7 }}
      end={{ x: 0.0, y: 1.4 }}>
      <Text.H1>Bienvenido</Text.H1>
      <Button style={styles.signUpButton} title="Regístrate" block primary />
      <Button style={styles.signInButton} title="Iniciar sesión" />
    </LinearGradient>
  );
};

export default IntroScreen;
