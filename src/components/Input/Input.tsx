import React, { forwardRef } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Colors } from '../../styles';
import styles from './Input.styles';

interface Props extends TextInputProps {
  iconLeft?: any;
  iconRight?: any;
  iconOutside?: any;
}

const Input = forwardRef(
  ({
    style,
    iconLeft,
    iconRight,
    iconOutside,
    placeholder,
    secureTextEntry,
    value,
    onChangeText,
    ...rest
  }: Props, ref?: React.Ref<TextInput>) => {
    return (
      <View style={[styles.container, style]}>
        <View
          style={[
            styles.inputContainer,
            iconOutside && styles.inputWithIconOutside,
          ]}>
          <View>{iconLeft}</View>
          <TextInput
            ref={ref}
            placeholderTextColor={Colors.duality}
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            {...rest}
          />
          <View>{iconRight}</View>
        </View>
        <View>{iconOutside}</View>
      </View>
    );
  },
);

export default Input;
