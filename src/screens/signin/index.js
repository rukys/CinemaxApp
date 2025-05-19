import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../../tailwind';
import {
  IconApple,
  IconAppWithoutText,
  IconFacebook,
  IconGoogle,
} from '../../assets';
import { Button, Header, Input } from '../../components';

export default function SigninScreen({ navigation }) {
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Login"
          styles={tw.style('mx-6')}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw.style('items-center mx-6')}>
            <IconAppWithoutText style={tw.style('mb-6 mt-10')} />
            <Text
              style={tw.style(
                'text-textWhite font-montserratSemiBold text-2xl mb-2',
              )}>
              CINEMAX
            </Text>
            <Text
              style={tw.style(
                'text-textWhiteGrey font-montserratSemiBold text-xs',
              )}>
              Welcome back! Please enter
            </Text>
            <Text
              style={tw.style(
                'text-textWhiteGrey font-montserratSemiBold text-xs',
              )}>
              your details.
            </Text>
          </View>
          <View style={tw.style('mx-6 mt-20')}>
            <Input label="Email Address" styles={tw.style('mb-6')} />
            <Input label="Password" isSecureText />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ForgotPassScreen');
              }}>
              <Text
                style={tw.style(
                  'font-montserratMedium text-xs text-primaryBlueAccent self-end mt-2',
                )}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <Button textButton="Login" styles={tw.style('mx-6 mt-10 mb-10')} />
          <Text
            style={tw.style(
              'text-white font-montserratSemiBold text-textGrey text-xs self-center mb-6',
            )}>
            Or Login with
          </Text>
          <View style={tw.style('flex-row self-center mb-12')}>
            <TouchableOpacity
              style={tw.style(
                'h-14 w-14 bg-white rounded-full mr-6 items-center justify-center',
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
                'h-14 w-14 bg-blueFB rounded-full ml-6 items-center justify-center',
              )}>
              <IconFacebook height={18} width={18} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
