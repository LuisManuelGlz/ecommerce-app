import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Colors } from '../../styles';
import styles from './Input.styles';

interface Props extends TextInputProps {
  iconLeft?: any;
  iconRight?: any;
  iconOutside?: any;
}

const Input = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={[
          styles.inputContainer,
          props.iconOutside && styles.inputWithIconOutside,
        ]}>
        <View>{props.iconLeft}</View>
        <TextInput
          placeholderTextColor={Colors.duality}
          style={styles.input}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          value={props.value}
          onChangeText={props.onChangeText}
          {...props}
        />
        <View>{props.iconRight}</View>
      </View>
      <View>{props.iconOutside}</View>
    </View>
  );
};

// Input.defaultProps = {
//   secureTextEntry: false,
// };

export default Input;
