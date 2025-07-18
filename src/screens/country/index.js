import { View } from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import { Header } from '../../components/commons';

export default function CountryScreen({ navigation }) {
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Country"
          styles={tw.style('mx-4')}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </>
  );
}
