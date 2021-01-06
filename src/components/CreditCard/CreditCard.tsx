import React, { Fragment } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../styles';
import Text from '../Text';
import styles from './CreditCard.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  name: string;
  date: string;
  type: 'visa' | 'mastercard';
  suffix: string;
}

const CreditCard = ({ name, date, type, suffix, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.bgCircle, styles.rightBgCircle]} />
      <View style={[styles.bgCircle, styles.bottomBgCircle]} />
      <View style={styles.logoContainer}>
        {type === 'visa' && (
          <FontAwesome name="cc-visa" size={35} color={Colors.light} />
        )}
        {type === 'mastercard' && (
          <Fragment>
            <View style={[styles.circle, styles.leftCircle]} />
            <View style={[styles.circle, styles.rightCircle]} />
          </Fragment>
        )}
      </View>
      <View style={styles.cardNumberContainer}>
        <View style={styles.cardNumberPart}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <View style={styles.cardNumberPart}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <View style={styles.cardNumberPart}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <Text size="h2" style={styles.text}>
          {suffix}
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <View>
          {name && (
            <Fragment>
              <Text>Nombre en la tarjeta</Text>
              <Text style={styles.text}>{name}</Text>
            </Fragment>
          )}
        </View>
        <View>
          {date && (
            <Fragment>
              <Text>Válida hasta</Text>
              <Text style={styles.text}>{date}</Text>
            </Fragment>
          )}
        </View>
      </View>
    </View>
  );
};

export default CreditCard;
