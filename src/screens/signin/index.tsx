import React, { useState, useMemo, useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../../tailwind';
import { IconAppWithoutText } from '../../assets';
import { Button, Header, Input } from '../../components/commons';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import { userStore } from '../../stores';
import useStoreFirebase from '../../hooks/use-store-firebase';
import {
  getAuthErrorMessage,
  getErrorCode,
  isValidEmail,
} from '../../utils/firebase-error';
import { showErrorToast } from '../../utils/toast';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigations/types';

type Props = StackScreenProps<RootStackParamList, 'SigninScreen'>;

export default function SigninScreen({ navigation }: Props) {
  const setUser = userStore(state => state.setUser);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginWithEmail } = useAuthFirebase();
  const { getUserFromFirestore } = useStoreFirebase();

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassScreen');
  }, [navigation]);

  const handlePressSignin = useCallback(async () => {
    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
      showErrorToast(getAuthErrorMessage('auth/invalid-email'));
      return;
    }

    setLoading(true);
    try {
      const user = await loginWithEmail(trimmedEmail, password);
      const snapshot = await getUserFromFirestore(user.uid);
      setUser(snapshot);
      navigation.reset({
        index: 0,
        routes: [{ name: 'AppBarScreen' }],
      });
    } catch (error) {
      showErrorToast(
        getErrorCode(error)
          ? getAuthErrorMessage(error)
          : 'Failed to load your profile. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }, [
    email,
    password,
    loginWithEmail,
    getUserFromFirestore,
    setUser,
    navigation,
  ]);

  const isDisabledButton = useMemo(() => {
    return email === '' || password === '';
  }, [email, password]);

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Login"
          styles={tw.style('mx-6')}
          onBackPress={handleBackPress}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw.style('items-center mx-6')}>
            <IconAppWithoutText style={tw.style('mb-6 mt-10')} />
            <Text
              style={tw.style(
                'text-textWhite font-montserratSemiBold text-2xl mb-2',
              )}>
              Cinemagz
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
            <Input
              label="Email Address"
              value={email}
              styles={tw.style('mb-6')}
              onChangeText={handleEmailChange}
            />
            <Input
              label="Password"
              value={password}
              isSecureText
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text
                style={tw.style(
                  'font-montserratMedium text-xs text-primaryBlueAccent self-end mt-2',
                )}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            textButton="Login"
            isLoading={loading}
            styles={tw.style('mx-6 mt-10 mb-10')}
            isDisabled={isDisabledButton}
            onPress={handlePressSignin}
          />
        </ScrollView>
      </View>
    </>
  );
}
