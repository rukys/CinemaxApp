import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import tw from '../../../../tailwind';
import { ImageBackdrop } from '../../../constants';

const formatDateWithPrefix = (dateString, prefix = 'On') => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `${prefix} ${formattedDate}`;
};

const Carouselitem = ({
  image,
  title = '',
  releaseDate,
  onPress = () => {},
}) => {
  const urlImg = ImageBackdrop(image) || '';

  return (
    <TouchableOpacity style={tw.style('flex-1 mx-1')} onPress={onPress}>
      <FastImage
        source={{ uri: urlImg }}
        style={tw.style('h-full w-full rounded-2xl')}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
        style={tw.style('absolute bottom-0 w-full rounded-b-2xl')}>
        <Text
          style={tw.style('text-lg text-white font-montserratSemiBold ml-4')}>
          {title}
        </Text>
        <Text style={tw.style('text-white text-xs font-montserrat mb-4 ml-4')}>
          {formatDateWithPrefix(releaseDate)}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Carouselitem;
