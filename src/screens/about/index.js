import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import { Header } from '../../components/commons';
import { IconApp } from '../../assets';

export default function AboutScreen({ navigation }) {
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="About"
          styles={tw.style('mx-4')}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={tw.style('mx-6 mt-6')}>
            <View style={tw.style('items-center mb-6')}>
              <IconApp />
            </View>
            <Text style={tw.style('text-white text-base font-montserrat mb-2')}>
              Cinemagz App is a movie search and exploration app that makes it
              easy for you to find detailed information about your favorite
              movies, TV series, and actors. All movie data and posters are
              provided by The Movie Database (TMDB).
            </Text>
            <Text style={tw.style('text-white text-base font-montserrat mb-2')}>
              Cinemagz App does not provide movie streaming services. This app
              only displays official information from TMDB.
            </Text>
            <Text style={tw.style('text-white text-base font-montserrat mb-2')}>
              This app uses the public API from The Movie Database (TMDB).
              Cinemagz App is not officially affiliated with TMDB.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
