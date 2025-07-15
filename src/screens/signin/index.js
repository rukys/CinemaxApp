import React, { useState, useMemo, useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../../tailwind';
import {
  // IconApple,
  IconAppWithoutText,
  IconFacebook,
  IconGoogle,
} from '../../assets';
import { Button, Header, Input } from '../../components/commons';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import { globalStore, userStore } from '../../stores';
import useStoreFirebase from '../../hooks/use-store-firebase';

export default function SigninScreen({ navigation }) {
  const setUser = userStore(state => state.setUser);
  const setLoading = globalStore(state => state.setLoading);
  const loading = globalStore(state => state.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginWithEmail } = useAuthFirebase();
  const { getUserFromFirestore } = useStoreFirebase();

  const handleEmailChange = useCallback(value => {
    setEmail(value);
  }, []);

  const handlePasswordChange = useCallback(value => {
    setPassword(value);
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassScreen');
  }, [navigation]);

  const handlePressSignin = useCallback(() => {
    setLoading(true);
    loginWithEmail(email, password)
      .then(response => {
        if (response?._user) {
          setLoading(false);
          getUserFromFirestore(response?.uid).then(snapshot => {
            setUser(snapshot);
            navigation.reset({
              index: 0,
              routes: [{ name: 'AppBarScreen' }],
            });
          });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [
    email,
    password,
    loginWithEmail,
    getUserFromFirestore,
    setUser,
    setLoading,
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
          <Text
            style={tw.style(
              'text-white font-montserratSemiBold text-textGrey text-xs self-center mb-6',
            )}>
            Or Login with
          </Text>
          <View style={tw.style('flex-row self-center mb-12')}>
            <TouchableOpacity
              style={tw.style(
                'h-14 w-14 bg-white rounded-full mr-3 items-center justify-center',
              )}>
              <IconGoogle height={18} width={18} />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={tw.style(
                'h-14 w-14 bg-primarySoft rounded-full items-center justify-center',
              )}>
              <IconApple height={18} width={18} />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={tw.style(
                'h-14 w-14 bg-blueFB rounded-full ml-3 items-center justify-center',
              )}>
              <IconFacebook height={18} width={18} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
