import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import tw from '../../../tailwind';
import { Button, Header } from '../../components/commons';

export default function WebViewScreen({ route, navigation }) {
  const { url = '' } = route.params;

  return (
    <View style={tw.style('flex-1')}>
      <Header
        styles={tw.style('bg-primaryDark p-4')}
        onBackPress={() => navigation.goBack()}
      />
      <WebView source={{ uri: url }} style={tw.style('flex-1')} />
      <View style={tw.style('bg-primaryDark p-4')}>
        <Button
          textButton="Back"
          textStyles={tw.style('text-white font-montserratMedium')}
          onPress={() => navigation.goBack()}
          styles={tw.style('bg-primarySoft')}
        />
      </View>
    </View>
  );
}
