import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  View,
} from 'react-native';
import tw from '../../../../tailwind';

interface Props {
  isVisible?: boolean;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  avoidKeyboard?: boolean;
  children?: React.ReactNode;
}

// Centered dialog built on React Native's own Modal. Replaces
// react-native-modal, which still calls InteractionManager (removed from
// React Native core in 0.82) and crashes on open.
// Props mirror the react-native-modal ones the app used.
const AppModal = ({
  isVisible = false,
  onBackdropPress = () => {},
  onBackButtonPress,
  avoidKeyboard = false,
  children,
}: Props) => {
  const content = (
    <View style={tw.style('flex-1 justify-center px-5')}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close dialog"
        onPress={onBackdropPress}
        style={[
          tw.style('absolute inset-0'),
          { backgroundColor: 'rgba(0,0,0,0.7)' },
        ]}
      />
      {children}
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onBackButtonPress ?? onBackdropPress}>
      {avoidKeyboard ? (
        <KeyboardAvoidingView
          style={tw.style('flex-1')}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </Modal>
  );
};

export default AppModal;
