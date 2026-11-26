import React from 'react';
import { Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import tw from '../../../../tailwind';

// JS-only checkbox. Replaces @react-native-community/checkbox so the app
// does not depend on a native module for a simple toggle.
const Checkbox = ({ value = false, onValueChange = () => {}, styles }) => {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value }}
      hitSlop={8}
      onPress={() => onValueChange(!value)}
      style={tw.style(
        'h-6 w-6 rounded-md border-2 items-center justify-center',
        value ? 'bg-primaryBlueAccent border-primaryBlueAccent' : 'border-textGrey',
        styles,
      )}>
      {value && <Check color={tw.color('white')} size={16} strokeWidth={3} />}
    </Pressable>
  );
};

export default Checkbox;
