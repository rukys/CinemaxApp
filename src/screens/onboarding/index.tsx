import { View, Text, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import { IconAppWithoutText } from '../../assets';
import { Button, Gap } from '../../components/commons';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigations/types';

type Props = StackScreenProps<RootStackParamList, 'OnboardingScreen'>;

export default function OnboardingScreen({ navigation }: Props) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView style={tw.style('flex-1 bg-primaryDark')}>
        <View style={tw.style('items-center mx-6')}>
          <Gap height={116} />
          <IconAppWithoutText />
          <Gap height={24} />
          <Text
            style={tw.style('text-textWhite font-montserratSemiBold text-2xl')}>
            CINEMAGZ
          </Text>
          <Text
            style={tw.style(' font-montserratSemiBold text-textGrey text-xs')}>
            Enter your registered
          </Text>
          <Text
            style={tw.style(' font-montserratSemiBold text-textGrey text-xs')}>
            Phone Number to Sign Up
          </Text>
          <Gap height={64} />
          <Button
            textButton="Sign Up"
            styles={tw.style('w-full')}
            onPress={() => {
              navigation.navigate('SignupScreen');
            }}
          />
          <Gap height={32} />
          <Text
            style={tw.style(
              'text-white font-montserratSemiBold text-textGrey text-xs',
            )}>
            I already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('SigninScreen')}
              style={tw.style(
                'text-white font-montserratSemiBold text-primaryBlueAccent text-xs',
              )}>
              Login
            </Text>
          </Text>
          <Gap height={48} />
          <Gap height={24} />
        </View>
      </ScrollView>
    </>
  );
}
