import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import tw from '../../../tailwind';
import { Button, Header, Input } from '../../components/commons';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import { getAuthErrorMessage, isValidEmail } from '../../utils/firebase-error';
import { showErrorToast, showSuccessToast } from '../../utils/toast';

// Uses Firebase's built-in password reset: the user receives an email with a
// link and sets the new password on Firebase's hosted page.
const ForgotPassScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { sendPasswordReset } = useAuthFirebase();

  const sendResetLink = useCallback(
    async targetEmail => {
      setIsLoading(true);
      try {
        await sendPasswordReset(targetEmail);
      } catch (error) {
        // Do not reveal whether an account exists for this email.
        if (
          error?.code !== 'auth/user-not-found' &&
          error?.code !== 'auth/invalid-credential'
        ) {
          showErrorToast(getAuthErrorMessage(error));
          return false;
        }
      } finally {
        setIsLoading(false);
      }
      return true;
    },
    [sendPasswordReset],
  );

  const handlePressSend = useCallback(async () => {
    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
      showErrorToast(getAuthErrorMessage('auth/invalid-email'));
      return;
    }
    const isSent = await sendResetLink(trimmedEmail);
    if (isSent) {
      setSentTo(trimmedEmail);
    }
  }, [email, sendResetLink]);

  const handlePressResend = useCallback(async () => {
    const isSent = await sendResetLink(sentTo);
    if (isSent) {
      showSuccessToast('We sent the reset link again.');
    }
  }, [sentTo, sendResetLink]);

  const handleBackPress = useCallback(() => {
    if (sentTo) {
      setSentTo('');
    } else {
      navigation.goBack();
    }
  }, [sentTo, navigation]);

  const handleBackToLogin = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={tw.style('flex-1 bg-primaryDark')}>
      <Header
        title=""
        styles={tw.style('mx-6')}
        onBackPress={handleBackPress}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        {!sentTo ? (
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
                  'text-textWhiteGrey font-montserratSemiBold text-xs text-center',
                )}>
                Enter the email address of your account and we will send you
                a link to reset your password.
              </Text>
            </View>
            <View style={tw.style('mx-6 mb-10')}>
              <Input
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                styles={tw.style('mb-6')}
              />
            </View>
            <View style={tw.style('mx-6')}>
              <Button
                textButton="Send Reset Link"
                isLoading={isLoading}
                isDisabled={isLoading || email.trim() === ''}
                onPress={handlePressSend}
              />
            </View>
          </>
        ) : (
          <>
            <View style={tw.style('items-center mx-6 mb-12')}>
              <Text
                style={tw.style(
                  'text-textWhite font-montserratSemiBold text-2xl mt-10 mb-2',
                )}>
                Check Your Email
              </Text>
              <Text
                style={tw.style(
                  'text-textWhiteGrey font-montserratSemiBold text-xs text-center',
                )}>
                If an account exists for {sentTo}, you will receive a link to
                reset your password. Check your spam folder too.
              </Text>
            </View>
            <View style={tw.style('mx-6')}>
              <Button
                textButton="Back to Login"
                styles={tw.style('mb-6')}
                onPress={handleBackToLogin}
              />
              <Text
                style={tw.style(
                  'font-montserratMedium text-textGrey text-base self-center mb-6',
                )}>
                Didn't receive the email?{' '}
                <Text
                  onPress={isLoading ? undefined : handlePressResend}
                  style={tw.style('text-primaryBlueAccent')}>
                  Resend
                </Text>
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ForgotPassScreen;
