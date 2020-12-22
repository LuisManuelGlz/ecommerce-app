import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../styles';
import styles from './IntroScreen.styles';
import { Text, Button } from '../../components';
import { TouchableOpacity } from 'react-native';

const IntroScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.dark, Colors.primary]}
      start={{ x: 0.0, y: 0.7 }}
      end={{ x: 0.0, y: 1.4 }}>
      <Text size="h1">Bienvenido</Text>
      <Button
        style={styles.signUpButton}
        title="Regístrate"
        block
        background="primary"
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
