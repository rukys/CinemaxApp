import { View, Text, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import tw from '../../../tailwind';
import { Button, Header, Input } from '../../components';

export default function SignupScreen({ navigation }) {
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Sign Up"
          styles={tw.style('mx-6')}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw.style('items-center mx-6')}>
            <Text
              style={tw.style(
                'text-textWhite font-montserratSemiBold text-2xl mt-10 mb-2',
              )}>
              Let's get started
            </Text>
            <Text
              style={tw.style(
                'text-textWhiteGrey font-montserratSemiBold text-xs',
              )}>
              The latest movies and series
            </Text>
            <Text
              style={tw.style(
                'text-textWhiteGrey font-montserratSemiBold text-xs',
              )}>
              are here
            </Text>
          </View>
          <View style={tw.style('mx-6 mt-20')}>
            <Input label="Full Name" styles={tw.style('mb-6')} />
            <Input label="Email Address" styles={tw.style('mb-6')} />
            <Input label="Password" isSecureText styles={tw.style('mb-4')} />
            <View style={tw.style('flex-row ')}>
              <CheckBox
                style={tw.style('mr-4')}
                tintColors={tw.color('textGrey')}
                onTintColor={tw.color('primaryBlueAccent')}
                onCheckColor={tw.color('primaryBlueAccent')}
              />
              <Text
                style={tw.style(
                  'flex-1 font-montserratMedium text-textGrey text-sm',
                )}>
                I agree to the{' '}
                <Text style={tw.style('text-primaryBlueAccent')}>
                  Terms and Services
                </Text>{' '}
                and{' '}
                <Text style={tw.style('text-primaryBlueAccent')}>
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </View>
          <Button textButton="Sign Up" styles={tw.style('mx-6 mt-10 mb-10')} />
        </ScrollView>
      </View>
    </>
  );
}
