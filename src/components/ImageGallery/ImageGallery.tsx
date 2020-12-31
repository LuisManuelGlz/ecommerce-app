import React, { Fragment, useState } from 'react';
import { View, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Colors } from '../../styles';
import styles from './ImageGallery.styles';

interface Props {
  images: string[];
  index?: number;
}

const ImageGallery = ({ images }: Props) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const _renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <View>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    );
  };

  return (
    <View>
      <Carousel
        data={images as any}
        renderItem={_renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        sliderWidth={400}
        itemWidth={335}
      />
      <Pagination
        containerStyle={styles.pagination}
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 10,
          backgroundColor: Colors.dark,
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 10,
          backgroundColor: Colors.darkLighten,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default ImageGallery;
