import { View, Text } from 'react-native';
import React from 'react';
import tw from '../../../tailwind';

export default function FavoriteScreen() {
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Text>FavoriteScreen</Text>
      </View>
    </>
  );
}
