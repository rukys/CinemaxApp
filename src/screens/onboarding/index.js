import {
  View,
  Text,
  StatusBar,
  // TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import {
  // IconApple,
  IconAppWithoutText,
  // IconFacebook,
  // IconGoogle,
} from '../../assets';
import { Button, Gap } from '../../components/commons';

export default function OnboardingScreen({ navigation }) {
  return (
    <>
      <StatusBar backgroundColor={tw.color('primaryDark')} />
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
          {/* <Text
            style={tw.style(
              'text-white font-montserratSemiBold text-textGrey text-xs',
            )}>
            Or Sign up with
          </Text> */}
          <Gap height={24} />
          {/* <View style={tw.style('flex-row')}>
            <TouchableOpacity
              style={tw.style(
                'h-14 w-14 bg-white rounded-full mr-3 items-center justify-center',
              )}>
              <IconGoogle height={18} width={18} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style(
                'h-14 w-14 bg-primarySoft rounded-full items-center justify-center',
              )}>
              <IconApple height={18} width={18} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style(
                'h-14 w-14 bg-blueFB rounded-full ml-3 items-center justify-center',
              )}>
              <IconFacebook height={18} width={18} />
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </>
  );
}
