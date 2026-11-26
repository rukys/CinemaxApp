import React, { useState, useMemo, useCallback } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import tw from '../../../tailwind';
import {
  CarouselSection,
  CategorySection,
  HomeHeaderSection,
  HomeSection,
  SearchSection,
} from '../../components/sections';
import { userStore } from '../../stores';
import useMovieGenre from '../../hooks/use-movie-genre';
import useMovieList from '../../hooks/use-movie-list';

export default function HomeScreen({ navigation }) {
  const [category, setCategory] = useState('All');

  const getUser = userStore(state => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const countryCode = getUser?.countryCode ?? '';
  const upcoming = useMovieList('upcoming', countryCode);
  const nowPlaying = useMovieList('now_playing', countryCode);
  const popular = useMovieList('popular', countryCode);
  const genre = useMovieGenre();

  const resultMovieUpcoming = upcoming.movies;
  const resultMovieNowplaying = nowPlaying.movies;
  const resultMoviePopular = popular.movies;
  const resultMovieGenre = genre.genres;

  const selectedGenreId = useMemo(() => {
    return category === 'All'
      ? null
      : resultMovieGenre.find(g => g.name === category)?.id;
  }, [category, resultMovieGenre]);

  const filteredPopular = useMemo(() => {
    return selectedGenreId
      ? resultMoviePopular.filter(movie =>
          movie.genre_ids.includes(selectedGenreId),
        )
      : resultMoviePopular;
  }, [selectedGenreId, resultMoviePopular]);

  const filteredUpcoming = useMemo(() => {
    return selectedGenreId
      ? resultMovieUpcoming.filter(movie =>
          movie.genre_ids.includes(selectedGenreId),
        )
      : resultMovieUpcoming;
  }, [selectedGenreId, resultMovieUpcoming]);

  const isAnyLoading = useMemo(() => {
    return (
      isLoading ||
      upcoming.isLoading ||
      nowPlaying.isLoading ||
      genre.isLoading ||
      popular.isLoading
    );
  }, [
    isLoading,
    upcoming.isLoading,
    nowPlaying.isLoading,
    genre.isLoading,
    popular.isLoading,
  ]);

  const handleMoviePress = useCallback(
    item => {
      navigation.navigate('MovieDetailScreen', { movieData: item });
    },
    [navigation],
  );

  const onRefreshScreen = useCallback(async () => {
    setIsLoading(true);

    const minDelay = new Promise(resolve => setTimeout(resolve, 1000));

    try {
      await Promise.all([
        minDelay,
        upcoming.refetch(),
        nowPlaying.refetch(),
        genre.refetch(),
        popular.refetch(),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [upcoming, nowPlaying, genre, popular]);

  return (
    <View style={tw.style('flex-1 bg-primaryDark')}>
      <ScrollView
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            // colors={tw.color('white')}
            tintColor={tw.color('white')}
            refreshing={isAnyLoading}
            onRefresh={onRefreshScreen}
          />
        }>
        <View style={tw.style('bg-primaryDark mb-6 mt-2')}>
          <HomeHeaderSection data={getUser} />
        </View>
        <SearchSection
          isOnPress
          styles={tw.style('mx-4 mb-6')}
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}
        />
        <CarouselSection
          styles={tw.style('mb-6')}
          dataCarousel={resultMovieNowplaying.slice(0, 5)}
          onPressCarousel={item => {
            handleMoviePress(item);
          }}
        />
        <CategorySection
          styles={tw.style('mb-6')}
          selectedCategory={category}
          dataCategory={resultMovieGenre}
          onSelectCategory={cat => {
            setCategory(cat);
          }}
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
            handleMoviePress(item);
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
            handleMoviePress(item);
          }}
        />
      </ScrollView>
    </View>
  );
}
