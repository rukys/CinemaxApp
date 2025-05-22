import { View, Text } from 'react-native';
import React from 'react';
import tw from '../../../tailwind';

export default function ProfileScreen() {
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Text>ProfileScreen</Text>
      </View>
    </>
  );
}
