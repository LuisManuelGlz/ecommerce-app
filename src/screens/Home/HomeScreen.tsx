import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import Carousel from 'react-native-snap-carousel';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Button, Text, Card } from '../../components';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();

  const entries = [
    {
      title: 'Beautiful and dramatic Antelope Canyon',
      description: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      price: '$99.99',
      image: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      title: 'Earlier this morning, NYC',
      description: 'Lorem ipsum dolor sit amet',
      price: '$99.99',
      image: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      title: 'White Pocket Sunset',
      description: 'Lorem ipsum dolor sit amet et nuncat ',
      price: '$99.99',
      image: 'https://i.imgur.com/MABUbpDl.jpg',
    },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      // <TouchableOpacity style={{ backgroundColor: 'red' }} onPress={() => navigation.navigate('ProductDetails')}>
      //   <Text size="h6">{item.title}</Text>
      // </TouchableOpacity>
      <Card item={item} />
    );
  };

  return (
    <ScrollView style={[styles.container, { marginTop: headerHeight }]}>
      <Carousel
        // ref={(c) => {
        //   _carousel = c;
        // }}
        data={entries}
        renderItem={_renderItem}
        sliderWidth={450}
        itemWidth={300}
      />
      <Carousel
        // ref={(c) => {
        //   _carousel = c;
        // }}
        data={entries}
        renderItem={_renderItem}
        sliderWidth={450}
        itemWidth={300}
      />
      <Carousel
        // ref={(c) => {
        //   _carousel = c;
        // }}
        data={entries}
        renderItem={_renderItem}
        sliderWidth={450}
        itemWidth={300}
      />
    </ScrollView>
  );
};

export default HomeScreen;
