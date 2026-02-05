import { View, FlatList } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import tw from '../../../tailwind';
import { CardList, Header } from '../../components/commons';
import { SearchSection } from '../../components/sections';
import useMovieGenre from '../../hooks/use-movie-genre';
import { useFocusEffect } from '@react-navigation/native';

export default function MovieListScreen({ navigation, route }) {
  const { movieList = [], title = '' } = route.params || {};

  const [searchText, setSearchText] = useState('');
  const [listMovie, setListMovie] = useState([]);

  const { getGenreNames } = useMovieGenre();

  const filteredList = useMemo(() => {
    if (!searchText) {
      return listMovie;
    }

    const lowercasedSearch = searchText.toLowerCase();
    return listMovie.filter(item => {
      const titleMatch = item?.title?.toLowerCase().includes(lowercasedSearch);
      const releaseDateMatch = item?.release_date
        ?.toLowerCase()
        .includes(lowercasedSearch);

      const genreNames = getGenreNames(item?.genre_ids)
        ?.join(', ')
        ?.toLowerCase();
      const genreMatch = genreNames?.includes(lowercasedSearch);

      return titleMatch || releaseDateMatch || genreMatch;
    });
  }, [searchText, listMovie, getGenreNames]);

  const onChangeSearch = useCallback(val => {
    setSearchText(val);
  }, []);

  const displayData = searchText === '' ? listMovie : filteredList;

  const handleMovieDetailPress = useCallback(
    item => {
      navigation.navigate('MovieDetailScreen', { movieData: item });
    },
    [navigation],
  );

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setListMovie(movieList);
    }, [movieList]),
  );

  return (
    <View style={tw.style('flex-1 bg-primaryDark')}>
      <Header
        styles={tw.style('mx-4 mb-5')}
        title={title}
        onBackPress={handleBackPress}
      />
      <SearchSection
        value={searchText}
        onChangeText={onChangeSearch}
        onCancel={() => onChangeSearch('')}
        styles={tw.style('mx-4 mb-5')}
        placeholder="Search Title, Release Date, Genre"
      />
      <FlatList
        data={displayData}
        style={tw.style('px-4')}
        keyExtractor={item => {
          return item?.id?.toString();
        }}
        renderItem={({ item, index }) => (
          <CardList
            key={item?.id?.toString()}
            image={item?.poster_path}
            title={item?.title}
            relaseDate={item?.release_date}
            rated={item?.vote_average}
            genreName={getGenreNames(item?.genre_ids)}
            onPressCard={() => handleMovieDetailPress(item)}
          />
        )}
      />
    </View>
  );
}
