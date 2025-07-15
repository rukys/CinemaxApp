import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import tw from '../../../tailwind';
import { CardList } from '../../components/commons';
import { HomeSection, SearchSection } from '../../components/sections';
import useMovieToprated from '../../hooks/use-movie-toprated';
import useMovieNowplaying from '../../hooks/use-movie-nowplaying';
import useMovieGenre from '../../hooks/use-movie-genre';
import useMovieSearch from '../../hooks/use-movie-search';
import { ImgNoResult } from '../../assets';

export default function SearchScreen({ navigation }) {
  const [valueSearch, setValueSearch] = useState('');

  const { resultMovieSearch, isLoadingMovieSearch } =
    useMovieSearch(valueSearch);
  const { resultMovieToprated } = useMovieToprated();
  const { moviesToday } = useMovieNowplaying();
  const { getGenreNames } = useMovieGenre();

  const handleSearchChange = useCallback(val => {
    setValueSearch(val);
  }, []);

  const handleSearchCancel = useCallback(() => {
    setValueSearch('');
  }, []);

  const handleTodayMoviePress = useCallback(() => {
    if (moviesToday.length > 0) {
      navigation.navigate('MovieDetailScreen', {
        movieData: moviesToday[0],
      });
    }
  }, [navigation, moviesToday]);

  const handleSeeAllPress = useCallback(() => {
    navigation.navigate('MovieListScreen', {
      movieList: resultMovieToprated,
      title: 'Top Rated',
    });
  }, [navigation, resultMovieToprated]);

  const handleMovieDetailPress = useCallback(
    item => {
      navigation.navigate('MovieDetailScreen', { movieData: item });
    },
    [navigation],
  );

  const isSearchEmpty = useMemo(() => valueSearch === '', [valueSearch]);
  const hasSearchResults = useMemo(
    () => resultMovieSearch.length > 0,
    [resultMovieSearch.length],
  );
  const hasMoviesToday = useMemo(
    () => moviesToday.length > 0,
    [moviesToday.length],
  );
  const shouldShowNoResult = useMemo(
    () => !isSearchEmpty && !hasSearchResults && !isLoadingMovieSearch,
    [isSearchEmpty, hasSearchResults, isLoadingMovieSearch],
  );
  const shouldShowTodaySection = useMemo(
    () => isSearchEmpty && !hasSearchResults && hasMoviesToday,
    [isSearchEmpty, hasSearchResults, hasMoviesToday],
  );
  const shouldShowTopRatedSection = useMemo(
    () => !hasSearchResults && isSearchEmpty,
    [hasSearchResults, isSearchEmpty],
  );

  const topRatedSliced = useMemo(
    () => resultMovieToprated.slice(0, 5),
    [resultMovieToprated],
  );

  const todayMovie = useMemo(() => moviesToday[0] || null, [moviesToday]);

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <SearchSection
          placeholder="Search title movie"
          value={valueSearch}
          onChangeText={handleSearchChange}
          onCancel={handleSearchCancel}
          styles={tw.style('mx-4 mt-2 mb-5')}
        />
        {shouldShowNoResult && (
          <View style={tw.style('items-center justify-center mt-40')}>
            <View style={tw.style('mb-5')}>
              <ImgNoResult />
            </View>
            <Text
              style={tw.style(
                'text-white font-montserratSemiBold text-base text-center mb-2',
              )}>
              We Are Sorry, We Can{'\n'} Not Find The Movie :(
            </Text>
            <Text
              style={tw.style('mb-4 text-textGrey text-sm font-montserrat')}>
              Find your movie by Type title
            </Text>
          </View>
        )}
        {shouldShowTodaySection && todayMovie && (
          <View style={tw.style('mx-4 mb-5')}>
            <Text
              style={tw.style(
                'text-base text-white font-montserratSemiBold mb-4',
              )}>
              Today
            </Text>
            <CardList
              image={moviesToday[0]?.poster_path}
              title={moviesToday[0]?.title}
              key={moviesToday[0]?.id}
              relaseDate={moviesToday[0]?.release_date}
              genreName={getGenreNames(moviesToday[0]?.genre_ids)}
              onPressCard={handleTodayMoviePress}
            />
          </View>
        )}
        {shouldShowTopRatedSection && (
          <HomeSection
            title="Top Rated"
            styles={tw.style('mb-6', moviesToday.length === 0 && 'mt-5')}
            dataHomeSection={topRatedSliced}
            onPressSeeAll={handleSeeAllPress}
            onPressHomeSection={item => handleMovieDetailPress(item)}
          />
        )}
        {hasSearchResults && (
          <FlatList
            data={resultMovieSearch}
            style={tw.style('px-4')}
            keyExtractor={item => {
              return item?.id?.toString();
            }}
            renderItem={({ item, index }) => (
              <CardList
                key={index.toString()}
                image={item?.poster_path}
                title={item?.title}
                relaseDate={item?.release_date}
                rated={item?.vote_average}
                genreName={getGenreNames(item?.genre_ids)}
                onPressCard={() => handleMovieDetailPress(item)}
              />
            )}
          />
        )}
      </View>
    </>
  );
}
