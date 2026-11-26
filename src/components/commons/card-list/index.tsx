import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import FastImage from '@d11/react-native-fast-image';
import { ImageCard } from '../../../constants';
import tw from '../../../../tailwind';
import { Calendar, Star } from 'lucide-react-native';

interface Props {
  image?: string | null;
  title?: string;
  releaseDate?: string;
  /** vote_average; favorites store it as a string. */
  rated?: number | string;
  genreName?: string[];
  onPressCard?: () => void;
}

const CardList = ({
  image,
  title = '',
  releaseDate = '',
  rated = 0,
  genreName = [],
  onPressCard = () => {},
}: Props) => {
  const urlImage = ImageCard(image) || '';
  const genreText = genreName.join(' | ');

  return (
    <TouchableOpacity onPress={onPressCard} style={tw.style('flex-row mb-6')}>
      {image === null ? (
        <View
          style={tw.style(
            'h-44 w-36 rounded-xl bg-primarySoft items-center justify-center',
          )}>
          <Text
            style={tw.style('text-center text-xs text-white font-montserrat')}>
            Image not available
          </Text>
        </View>
      ) : (
        <FastImage
          source={{ uri: urlImage }}
          resizeMode="cover"
          style={tw.style('h-44 w-36 rounded-xl')}
        />
      )}
      <View style={tw.style('flex-1 ml-4')}>
        {Number(rated) > 0 && (
          <View
            style={tw.style(
              'flex-row items-center w-16 p-2 rounded-lg bg-primarySoft',
            )}>
            <Star
              size={16}
              color={tw.color('secondaryOrange')}
              fill={tw.color('secondaryOrange')}
            />
            <Text
              style={tw.style(
                'text-secondaryOrange font-montserratSemiBold ml-2 ',
              )}>
              {Number(rated).toFixed(1)}
            </Text>
          </View>
        )}
        <Text
          numberOfLines={3}
          style={tw.style(
            'text-white text-xl mt-3 mb-3 font-montserratSemiBold',
          )}>
          {title}
        </Text>
        <View style={tw.style('flex-row items-center mb-2')}>
          <Calendar
            color={tw.color('textWhite')}
            size={16}
            style={tw.style('mr-1')}
          />
          <Text style={tw.style('text-textGrey font-montserrat ml-2')}>
            {releaseDate}
          </Text>
        </View>
        <View style={tw.style('')}>
          <Text style={tw.style('text-textGrey font-montserrat')}>
            {genreText}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardList;
