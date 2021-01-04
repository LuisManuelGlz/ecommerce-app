import React, { forwardRef } from 'react';
import { View, TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../../styles';
import styles from './Input.styles';

interface Props extends TextInputProps {
  iconLeft?: any;
  iconRight?: any;
  iconOutside?: any;
  inputStyle?: StyleProp<ViewStyle>;
  radius?: number;
}

const Input = forwardRef(
  (
    {
      style,
      iconLeft,
      iconRight,
      iconOutside,
      inputStyle,
      radius,
      placeholder,
      secureTextEntry,
      value,
      onChangeText,
      ...rest
    }: Props,
    ref?: React.Ref<TextInput>,
  ) => {
    return (
      <View style={[styles.container, style]}>
        <View
          style={[
            styles.inputContainer,
            inputStyle,
            radius && { borderRadius: radius },
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
