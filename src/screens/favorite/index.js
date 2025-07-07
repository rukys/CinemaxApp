import { View, Text } from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import { ImgNoFavorite } from '../../assets';
import { Header } from '../../components/commons';

export default function FavoriteScreen() {
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Favorite"
          styles={tw.style('mx-4')}
          isOnBackPress={false}
        />
        <View style={tw.style('flex-1 items-center justify-center')}>
          <ImgNoFavorite style={tw.style('mb-4')} />
          <Text
            style={tw.style(
              'text-base font-montserratSemiBold text-white mb-2',
            )}>
            There Is No Movie Yet!
          </Text>
          <Text
            style={tw.style(
              'text-sm font-montserrat text-textGrey mx-10 text-center',
            )}>
            Find your movie by Type title, categories, years, etc
          </Text>
        </View>
      </View>
    </>
  );
}
