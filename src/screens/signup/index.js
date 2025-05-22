import { View, Text, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import tw from '../../../tailwind';
import { Button, Header, Input } from '../../components/commons';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import { userStore } from '../../stores';
import useStoreFirebase from '../../hooks/use-store-firebase';

export default function SignupScreen({ navigation }) {
  const setUser = userStore(state => state.setUser);

  const { registerWithEmail } = useAuthFirebase();
  const { saveUserToFirestore } = useStoreFirebase();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckBox, setIsCheckBox] = useState(false);

  const handlePressSignup = () => {
    registerWithEmail(email, password, fullName).then(response => {
      if (response?._user) {
        const storeSignup = {
          id: response?.uid,
          fullName: fullName,
          email: response?.email,
          photo: response?.photoURL,
          phoneNumber: response?.phoneNumber,
        };

        setUser(storeSignup);
        saveUserToFirestore(storeSignup);
        navigation.reset({
          index: 0,
          routes: [{ name: 'AppBarScreen' }],
        });
      }
    });
  };

  const isDisabledButton =
    email === '' || fullName === '' || password === '' || !isCheckBox;

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
            <Input
              label="Full Name"
              styles={tw.style('mb-6')}
              onChangeText={val => setFullName(val)}
            />
            <Input
              label="Email Address"
              styles={tw.style('mb-6')}
              onChangeText={val => setEmail(val)}
            />
            <Input
              label="Password"
              isSecureText
              styles={tw.style('mb-4')}
              onChangeText={val => setPassword(val)}
            />
            <View style={tw.style('flex-row mt-2')}>
              <CheckBox
                onValueChange={val => setIsCheckBox(val)}
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
