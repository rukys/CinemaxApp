import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import tw from '../../../tailwind';
import { Button, Header, Input } from '../../components/commons';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import { globalStore, userStore } from '../../stores';
import useStoreFirebase from '../../hooks/use-store-firebase';

export default function SignupScreen({ navigation }) {
  const setUser = userStore(state => state.setUser);

  const { registerWithEmail } = useAuthFirebase();
  const { saveUserToFirestore } = useStoreFirebase();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckBox, setIsCheckBox] = useState(false);

  const isLoading = globalStore(state => state.loading);
  const setIsLoading = globalStore(state => state.setLoading);

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

  const handlePressSignup = useCallback(() => {
    setIsLoading(true);
    registerWithEmail(email, password, fullName).then(response => {
      if (response?._user) {
        setIsLoading(false);
        const storeSignup = {
          id: response?.uid,
          fullName: fullName,
          email: response?.email,
          photo: response?.photoURL,
          phoneNumber: response?.phoneNumber,
        };

        setUser(storeSignup);
        saveUserToFirestore(storeSignup);
        navigation.replace('CountryScreen', { isFromSignup: true });
      }
    });
  }, [
    email,
    password,
    fullName,
    registerWithEmail,
    setUser,
    saveUserToFirestore,
    setIsLoading,
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
              <CheckBox
                value={isCheckBox}
                onValueChange={handleCheckboxChange}
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
