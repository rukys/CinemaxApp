import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../../tailwind';
import { IconNotification } from '../../assets';
import {
  CarouselSection,
  CategorySection,
  HomeSection,
  SearchSection,
} from '../../components/sections';
import useMovieUpcoming from '../../hooks/use-movie-upcoming';
import { userStore } from '../../stores';
import useMovieGenre from '../../hooks/use-movie-genre';
import useMoviePopular from '../../hooks/use-movie-popular';
import { Gap } from '../../components/commons';
import useMovieNowplaying from '../../hooks/use-movie-nowplaying';

export default function HomeScreen({ navigation }) {
  const [category, setCategory] = useState('All');

  const getUser = userStore(state => state.user);

  const { resultMovieUpcoming } = useMovieUpcoming();
  const { resultMovieNowplaying } = useMovieNowplaying();
  const { resultMovieGenre } = useMovieGenre();
  const { resultMoviePopular } = useMoviePopular();

  const selectedGenreId =
    category === 'All'
      ? null
      : resultMovieGenre.find(g => g.name === category)?.id;

  const filteredPopular = selectedGenreId
    ? resultMoviePopular.filter(movie =>
        movie.genre_ids.includes(selectedGenreId),
      )
    : resultMoviePopular;

  const filteredUpcoming = selectedGenreId
    ? resultMovieUpcoming.filter(movie =>
        movie.genre_ids.includes(selectedGenreId),
      )
    : resultMovieUpcoming;

  return (
    <View style={tw.style('flex-1 bg-primaryDark')}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <View style={tw.style('bg-primaryDark mb-6 mt-2')}>
          <View style={tw.style('flex-row items-center py-2')}>
            <Gap width={16} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProfileEditScreen');
              }}
              style={tw.style('h-10 w-10 rounded-full bg-textGrey')}
            />
            <View style={tw.style('flex-1 ml-4')}>
              <Text
                style={tw.style(
                  'text-base text-white font-montserratSemiBold',
                )}>
                Hello, {getUser?.fullName}
              </Text>
              <Text style={tw.style('text-textGrey font-montserrat text-xs')}>
                Let's stream your favorite movie
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NotificationScreen');
              }}
              style={tw.style(
                'h-10 w-10 bg-primarySoft items-center justify-center rounded-xl',
              )}>
              <IconNotification />
            </TouchableOpacity>
            <Gap width={16} />
          </View>
        </View>
        <SearchSection
          styles={tw.style('mx-4 mb-6')}
          isOnPress
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}
        />
        <CarouselSection
          styles={tw.style('mb-6')}
          dataCarousel={resultMovieNowplaying.slice(0, 5)}
          onPressCarousel={item => {
            navigation.navigate('MovieDetailScreen', { movieData: item });
          }}
        />
        <CategorySection
          styles={tw.style('mb-6')}
          selectedCategory={category}
          onSelectCategory={cat => {
            setCategory(cat);
          }}
          dataCategory={resultMovieGenre}
        />
        <HomeSection
          title="Most Popular"
          styles={tw.style('mb-6')}
          dataHomeSection={filteredPopular.slice(0, 5)}
          onPressSeeAll={() => {
            navigation.navigate('MovieListScreen', {
              movieList: filteredPopular,
              title: 'Most Popular',
            });
          }}
          onPressHomeSection={item => {
            navigation.navigate('MovieDetailScreen', { movieData: item });
          }}
        />
        <HomeSection
          title="Upcoming"
          styles={tw.style('mb-6')}
          dataHomeSection={filteredUpcoming.slice(0, 5)}
          onPressSeeAll={() => {
            navigation.navigate('MovieListScreen', {
              movieList: filteredUpcoming,
              title: 'Upcoming',
            });
          }}
          onPressHomeSection={item => {
            navigation.navigate('MovieDetailScreen', { movieData: item });
          }}
        />
      </ScrollView>
    </View>
  );
}
