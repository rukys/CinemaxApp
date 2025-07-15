import { View } from 'react-native';
import React, { useCallback } from 'react';
import tw from '../../../tailwind';
import { Header } from '../../components/commons';

export default function HelpFaqScreen({ navigation }) {
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Help & Feedback"
          styles={tw.style('mx-4')}
          onBackPress={handleBackPress}
        />
      </View>
    </>
  );
}
