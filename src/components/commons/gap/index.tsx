import React from 'react';
import { View } from 'react-native';

interface Props {
  height?: number;
  width?: number;
}

const Gap = ({ height, width }: Props) => {
  return <View style={{ height: height, width: width }} />;
};

export default Gap;
