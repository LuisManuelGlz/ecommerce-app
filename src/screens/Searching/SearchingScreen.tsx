import React from 'react';
import { View, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../components';
import styles from './SearchingScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../styles';

const SearchScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, setValue } = useForm();

  const onSubmit = ({ search }: any) => {
    if (search !== '') {
      navigation.navigate('SearchResult', { search });
    }
  };

  return (
    <View style={[styles.container, { marginTop: 12 }]}>
      <Controller
        name="search"
        control={control}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <Input
            style={{ width: 325, alignSelf: 'flex-end' }}
            radius={50}
            onBlur={onBlur}
            onSubmitEditing={handleSubmit(onSubmit)}
            autoFocus
            placeholder="Buscar"
            onChangeText={(value: string) => onChange(value)}
            value={value}
            iconRight={
              value !== '' && (
                <Ionicons
                  onPress={() => setValue('search', '')}
                  name="close"
                  size={24}
                  color={Colors.duality}
                />
              )
            }
          />
        )}
      />
    </View>
  );
};

export default SearchScreen;
