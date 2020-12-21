import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../styles';

const SignUpStepOneScreen = () => {
  return (
    <View>
      <LinearGradient
        colors={[Colors.dark, Colors.primary]}
        start={{ x: 0.0, y: 0.7 }}
        end={{ x: 0.0, y: 1.4 }}>
        <Text>Hello from signupstepone</Text>
      </LinearGradient>
    </View>
  );
};

export default SignUpStepOneScreen;