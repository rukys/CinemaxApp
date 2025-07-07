import React from 'react';
import { View } from 'react-native';
import tw from '../../../tailwind';
import { Header } from '../../components/commons';

export default function ProfileEditScreen({ navigation }) {
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Edit Profile"
          styles={tw.style('mx-4')}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </>
  );
}
