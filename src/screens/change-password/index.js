import { View, ScrollView, Text } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import tw from '../../../tailwind';
import { Button, Header, Input } from '../../components/commons';
import useAuthFirebase from '../../hooks/use-auth-firebase';
import {
  getAuthErrorMessage,
  MIN_PASSWORD_LENGTH,
} from '../../utils/firebase-error';
import { showErrorToast, showSuccessToast } from '../../utils/toast';

const getValidationError = (oldPassword, newPassword, confirmPassword) => {
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return `New password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (newPassword !== confirmPassword) {
    return 'New password and confirmation do not match.';
  }
  if (newPassword === oldPassword) {
    return 'New password must be different from the old password.';
  }
  return '';
};

export default function ChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { changePassword } = useAuthFirebase();

  const isDisabledButton = useMemo(
    () =>
      isLoading ||
      oldPassword === '' ||
      newPassword === '' ||
      confirmPassword === '',
    [isLoading, oldPassword, newPassword, confirmPassword],
  );

  const handlePressChangePassword = useCallback(async () => {
    const validationError = getValidationError(
      oldPassword,
      newPassword,
      confirmPassword,
    );
    if (validationError) {
      showErrorToast(validationError);
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(oldPassword, newPassword);
      showSuccessToast('Your password has been changed.');
      navigation.goBack();
    } catch (error) {
      const isWrongOldPassword =
        error?.code === 'auth/wrong-password' ||
        error?.code === 'auth/invalid-credential';
      showErrorToast(
        isWrongOldPassword
          ? 'Your old password is incorrect.'
          : getAuthErrorMessage(error),
      );
    } finally {
      setIsLoading(false);
    }
  }, [oldPassword, newPassword, confirmPassword, changePassword, navigation]);

  return (
    <View style={tw.style('flex-1 bg-primaryDark')}>
      <Header
        title="Change Password"
        styles={tw.style('mx-4')}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={tw.style('flex-1')}
        keyboardShouldPersistTaps="handled">
        <View style={tw.style('mt-6')}>
          <Input
            label="Old Password"
            value={oldPassword}
            isSecureText
            onChangeText={setOldPassword}
            styles={tw.style('mx-6 mb-6')}
          />
          <Input
            label="New Password"
            value={newPassword}
            isSecureText
            onChangeText={setNewPassword}
            styles={tw.style('mx-6 mb-6')}
          />
          <Input
            label="Confirm New Password"
            value={confirmPassword}
            isSecureText
            onChangeText={setConfirmPassword}
            styles={tw.style('mx-6 mb-2')}
          />
          <Text
            style={tw.style('mx-8 text-textGrey text-xs font-montserrat')}>
            Password must be at least {MIN_PASSWORD_LENGTH} characters.
          </Text>
        </View>
      </ScrollView>
      <View style={tw.style('mx-6 mb-10')}>
        <Button
          textButton="Change Password"
          isLoading={isLoading}
          isDisabled={isDisabledButton}
          onPress={handlePressChangePassword}
        />
      </View>
    </View>
  );
}
