import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import React from 'react';
import tw from '../../../../tailwind';

interface Props {
  textButton?: string;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
  /** Merged through `tw.style`, so it must be a plain style object. */
  textStyles?: TextStyle;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const Button = ({
  textButton = '',
  onPress = () => {},
  styles,
  textStyles,
  isDisabled = false,
  isLoading = false,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        tw.style(
          'bg-primaryBlueAccent h-14 items-center justify-center rounded-full',
          isDisabled && 'bg-textGrey',
        ),
        styles,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={tw.color('white')} />
      ) : (
        <Text
          style={tw.style(
            'text-textWhite font-montserratMedium text-base',
            textStyles,
          )}>
          {textButton}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
