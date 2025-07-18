import { View, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import tw from '../../../tailwind';
import { CardList, Header } from '../../components/commons';
import { SearchSection } from '../../components/sections';
import useMovieGenre from '../../hooks/use-movie-genre';

export default function MovieListScreen({ navigation, route }) {
  const { movieList = [], title = '' } = route.params || {};

  const { getGenreNames } = useMovieGenre();

  const handleMovieDetailPress = useCallback(
    item => {
      navigation.navigate('MovieDetailScreen', { movieData: item });
    },
    [navigation],
  );

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={tw.style('flex-1 bg-primaryDark')}>
      <Header
        styles={tw.style('mx-4 mb-5')}
        title={title}
        onBackPress={handleBackPress}
      />
      <SearchSection
        styles={tw.style('mx-4 mb-5')}
        placeholder="Search Title, Realese Date, Genre"
      />
      <FlatList
        data={movieList}
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
    </View>
  );
}
