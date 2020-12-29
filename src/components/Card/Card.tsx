import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, Button } from '..';
import styles from './Card.styles';

interface Props {
  item: any;
  index: number;
}

const Card = ({ item, index }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetails')}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.footerContainer}>
        <Text style={styles.title} size="h5">{item.title}</Text>
        <View style={styles.footer}>
          <Text size="h3">{item.price}</Text>
          <Button
            style={styles.button}
            background="primary"
            title="Agregar al carrito"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
