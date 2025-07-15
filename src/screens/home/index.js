/* eslint-disable react-hooks/exhaustive-deps */
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
import useMovieUpcoming from '../../hooks/use-movie-upcoming';
import { globalStore, userStore } from '../../stores';
import useMovieGenre from '../../hooks/use-movie-genre';
import useMoviePopular from '../../hooks/use-movie-popular';
import useMovieNowplaying from '../../hooks/use-movie-nowplaying';

export default function HomeScreen({ navigation }) {
  const [category, setCategory] = useState('All');

  const getUser = userStore(state => state.user);
  const isLoading = globalStore(state => state.loading);
  const setIsLoading = globalStore(state => state.setLoading);

  const {
    resultMovieUpcoming,
    isLoadingMovieUpcoming,
    onRefetchMovieUpcoming,
  } = useMovieUpcoming();
  const {
    resultMovieNowplaying,
    isLoadingMovieNowplaying,
    onRefetchMovieNowplaying,
  } = useMovieNowplaying();
  const { resultMovieGenre, isLoadingMovieGenre, onRefetchMovieGenre } =
    useMovieGenre();
  const { resultMoviePopular, isLoadingMoviePopular, onRefetchMoviePopular } =
    useMoviePopular();

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
      isLoadingMovieUpcoming ||
      isLoadingMovieNowplaying ||
      isLoadingMovieGenre ||
      isLoadingMoviePopular
    );
  }, [
    isLoading,
    isLoadingMovieUpcoming,
    isLoadingMovieNowplaying,
    isLoadingMovieGenre,
    isLoadingMoviePopular,
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
        onRefetchMovieUpcoming(),
        onRefetchMovieNowplaying(),
        onRefetchMovieGenre(),
        onRefetchMoviePopular(),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [
    onRefetchMovieUpcoming,
    onRefetchMovieNowplaying,
    onRefetchMovieGenre,
    onRefetchMoviePopular,
  ]);

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
