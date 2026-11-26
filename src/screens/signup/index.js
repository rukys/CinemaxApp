import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from '../../../tailwind';
import { Button, Checkbox, Header, Input } from '../../components/commons';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import { userStore } from '../../stores';
import useStoreFirebase from '../../hooks/use-store-firebase';
import {
  getAuthErrorMessage,
  isValidEmail,
  MIN_PASSWORD_LENGTH,
} from '../../utils/firebase-error';
import { showErrorToast } from '../../utils/toast';

export default function SignupScreen({ navigation }) {
  const setUser = userStore(state => state.setUser);

  const { registerWithEmail, deleteAccount } = useAuthFirebase();
  const { saveUserToFirestore } = useStoreFirebase();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckBox, setIsCheckBox] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleFullNameChange = useCallback(value => {
    setFullName(value);
  }, []);

  const handleEmailChange = useCallback(value => {
    setEmail(value);
  }, []);

  const handlePasswordChange = useCallback(value => {
    setPassword(value);
  }, []);

  const handleCheckboxChange = useCallback(value => {
    setIsCheckBox(value);
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePressSignup = useCallback(async () => {
    const trimmedEmail = email.trim();
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      showErrorToast('Please enter your full name.');
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      showErrorToast(getAuthErrorMessage('auth/invalid-email'));
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      showErrorToast(getAuthErrorMessage('auth/weak-password'));
      return;
    }

    setIsLoading(true);
    let user = null;
    try {
      user = await registerWithEmail(trimmedEmail, password);
    } catch (error) {
      showErrorToast(getAuthErrorMessage(error));
      setIsLoading(false);
      return;
    }

    const storeSignup = {
      id: user.uid,
      fullName: trimmedName,
      email: user.email,
      photo: user.photoURL ?? null,
      phoneNumber: user.phoneNumber ?? null,
    };

    try {
      // Save the profile before navigating so the user never lands in the
      // app without a Firestore document.
      await saveUserToFirestore(storeSignup);
      setUser(storeSignup);
      navigation.replace('CountryScreen', { isFromSignup: true });
    } catch (error) {
      // Roll back the new auth account so the user can sign up again with
      // the same email instead of being stuck without a profile.
      try {
        await deleteAccount(user);
      } catch (rollbackError) {
        // Ignore: nothing else we can do on the client.
      }
      showErrorToast('Failed to save your profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [
    email,
    deleteAccount,
    password,
    fullName,
    registerWithEmail,
    setUser,
    saveUserToFirestore,
    navigation,
  ]);

  const isDisabledButton = useMemo(() => {
    return email === '' || fullName === '' || password === '' || !isCheckBox;
  }, [email, fullName, password, isCheckBox]);

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Sign Up"
          styles={tw.style('mx-6')}
          onBackPress={handleBackPress}
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
            <Input
              label="Full Name"
              value={fullName}
              styles={tw.style('mb-6')}
              onChangeText={handleFullNameChange}
            />
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
              styles={tw.style('mb-4')}
              onChangeText={handlePasswordChange}
            />
            <View style={tw.style('flex-row mt-2')}>
              <Checkbox
                value={isCheckBox}
                onValueChange={handleCheckboxChange}
                styles={tw.style('mr-4 mt-0.5')}
              />
              <Text
                style={tw.style(
                  'flex-1 font-montserratMedium text-textGrey text-sm',
                )}>
                I agree to the{' '}
                <Text
                  style={tw.style('text-primaryBlueAccent')}
                  onPress={() => {
                    navigation.navigate('PrivacyPolicyScreen');
                  }}>
                  Terms and Services
                </Text>{' '}
                and{' '}
                <Text
                  style={tw.style('text-primaryBlueAccent')}
                  onPress={() => {
                    navigation.navigate('PrivacyPolicyScreen');
                  }}>
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </View>
          <Button
            isLoading={isLoading}
            textButton="Sign Up"
            isDisabled={isDisabledButton}
            styles={tw.style('mx-6 mt-10 mb-10')}
            onPress={handlePressSignup}
          />
        </ScrollView>
      </View>
    </>
  );
}
