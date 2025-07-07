import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { ImageCard } from '../../../constants';
import tw from '../../../../tailwind';

const CardPoster = ({
  image,
  title = '',
  genre = '',
  rated = '',
  styles,
  onPressCard = () => {},
}) => {
  const urlImage = ImageCard(image) || '';
  return (
    <TouchableOpacity
      onPress={onPressCard}
      style={tw.style('bg-primarySoft rounded-xl w-36 mr-4')}>
      <FastImage
        source={{ uri: urlImage }}
        resizeMode="cover"
        style={tw.style('h-44 w-36 rounded-t-xl')}
      />
      <View style={tw.style('p-4')}>
        <Text
          lineBreakMode="tail"
          numberOfLines={1}
          style={tw.style('text-white font-montserratSemiBold')}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardPoster;
