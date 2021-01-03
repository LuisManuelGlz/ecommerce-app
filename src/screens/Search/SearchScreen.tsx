import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../../components';
import styles from './SearchScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../styles';

const SearchScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { marginTop: 12 }]}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.darkLighten,
          height: 36,
          width: '100%',
          borderRadius: 50,
          justifyContent: 'center',
          paddingHorizontal: 23,
          alignSelf: 'flex-end',
        }}
        onPress={() => navigation.navigate('Searching')}>
        <Text size="h5">Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchScreen;
