import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from '../Text';
import styles from './HistoryOrder.styles';

interface Props extends TouchableOpacityProps {
  orderNumber?: string;
}

const HistoryOrder = ({
  style,
  orderNumber,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      <Text style={styles.orderNumber} size="h3">
        Orden {orderNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default HistoryOrder;
