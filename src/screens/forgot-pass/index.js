import { View, Text } from 'react-native';
import React, { useState } from 'react';
import tw from '../../../tailwind';
import { Button, Header, Input } from '../../components';

const ForgotPassScreen = ({ navigation }) => {
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title=""
          styles={tw.style('mx-6')}
          onBackPress={() => {
            if (isSendEmail && isContinue) {
              setIsSendEmail(false);
              setIsContinue(false);
            } else if (isSendEmail && !isContinue) {
              setIsSendEmail(false);
            } else {
              navigation.goBack();
            }
          }}
        />
        {!isSendEmail && !isContinue && (
          <>
            <View style={tw.style('items-center mx-6 mb-12')}>
              <Text
                style={tw.style(
                  'text-textWhite font-montserratSemiBold text-2xl mt-10 mb-2',
                )}>
                Reset Password
              </Text>
              <Text
                style={tw.style(
                  'text-textWhiteGrey font-montserratSemiBold text-xs',
                )}>
                Recover your account password
              </Text>
            </View>
            <View style={tw.style('mx-6 mb-10')}>
              <Input label="Email Address" styles={tw.style('mb-6')} />
            </View>
            <View style={tw.style('mx-6')}>
              <Button
                textButton="Next"
                onPress={() => {
                  setIsSendEmail(true);
                }}
              />
            </View>
          </>
        )}
        {isSendEmail && !isContinue && (
          <>
            <View style={tw.style('items-center mx-6 mb-12')}>
              <Text
                style={tw.style(
                  'text-textWhite font-montserratSemiBold text-2xl mt-10 mb-2',
                )}>
                Verifying Your Account
              </Text>
              <Text
                style={tw.style(
                  'text-textWhiteGrey font-montserratSemiBold text-xs',
                )}>
                We have just sent you 4 digit code via your
              </Text>
              <Text
                style={tw.style(
                  'text-textWhiteGrey font-montserratSemiBold text-xs',
                )}>
                email example@gmail.com
              </Text>
            </View>
            <View style={tw.style('mx-6 mb-10')}>
              <Input label="Email Address" styles={tw.style('mb-6')} />
            </View>
            <View style={tw.style('mx-6')}>
              <Button
                textButton="Continue"
                styles={tw.style('mb-6')}
                onPress={() => {
                  setIsContinue(true);
                }}
              />
              <Text
                style={tw.style(
                  'text-white font-montserratMedium text-textGrey text-base self-center mb-6',
                )}>
                Didn't received code?{' '}
                <Text
                  onPress={() => {}}
                  style={tw.style('text-primaryBlueAccent')}>
                  Resend
                </Text>
              </Text>
            </View>
          </>
        )}
        {isSendEmail && isContinue && (
          <>
            <View style={tw.style('items-center mx-6 mb-12')}>
              <Text
                style={tw.style(
                  'text-textWhite font-montserratSemiBold text-2xl mt-10 mb-2',
                )}>
                Create New Password
              </Text>
              <Text
                style={tw.style(
                  'text-textWhiteGrey font-montserratSemiBold text-xs',
                )}>
                Enter your new password
              </Text>
            </View>
            <View style={tw.style('mx-6 mb-10')}>
              <Input
                label="New Password"
                isSecureText
                styles={tw.style('mb-6')}
              />
              <Input
                label="Confirm Password"
                isSecureText
                styles={tw.style('mb-10')}
              />
            </View>
            <View style={tw.style('mx-6')}>
              <Button
                textButton="Reset"
                onPress={() => {
                  setIsSendEmail(false);
                  setIsContinue(false);
                }}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default ForgotPassScreen;
