import {View, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {IconApp} from '../../assets';
import tw from '../../../tailwind';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('OnboardingScreen');
    }, 2000);
  }, [navigation]);
  return (
    <>
      <StatusBar hidden />
      <View
        style={tw.style('flex-1 bg-primaryDark items-center justify-center')}>
        <IconApp />
      </View>
    </>
  );
}
