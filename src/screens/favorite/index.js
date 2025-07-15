/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import tw from '../../../tailwind';
import { ImgNoFavorite } from '../../assets';
import { CardList, Header } from '../../components/commons';
import useStoreFirebase from '../../hooks/use-store-firebase';
import { userStore } from '../../stores';
import useMovieGenre from '../../hooks/use-movie-genre';
import { SearchSection } from '../../components/sections';

export default function FavoriteScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [listFavoriteMovie, setListFavoriteMovie] = useState([]);

  const getUser = userStore(state => state.user);

  const { getListFavoriteMovie } = useStoreFirebase();
  const { getGenreNames } = useMovieGenre();

  const filteredList = useMemo(() => {
    if (!searchText) {
      return listFavoriteMovie;
    }

    const lowercasedSearch = searchText.toLowerCase();
    return listFavoriteMovie.filter(item => {
      const titleMatch = item?.title?.toLowerCase().includes(lowercasedSearch);
      const releaseDateMatch = item?.releaseDate
        ?.toLowerCase()
        .includes(lowercasedSearch);

      const genreNames = getGenreNames(JSON.parse(item?.genres))
        ?.join(', ')
        ?.toLowerCase();
      const genreMatch = genreNames?.includes(lowercasedSearch);

      return titleMatch || releaseDateMatch || genreMatch;
    });
  }, [searchText, listFavoriteMovie, getGenreNames]);

  const displayData = useMemo(() => {
    return searchText === '' ? listFavoriteMovie : filteredList;
  }, [searchText, listFavoriteMovie, filteredList]);

  const onChangeSearch = useCallback(val => {
    setSearchText(val);
  }, []);

  const onFetchListFavoriteMovie = useCallback(() => {
    if (!getUser?.id) {
      return;
    }

    getListFavoriteMovie(getUser.id)
      .then(res => {
        if (res) {
          setListFavoriteMovie(res);
        }
      })
      .catch(() => {
        setListFavoriteMovie([]);
      });
  }, [getUser?.id, getListFavoriteMovie]);

  const handleMovieDetailPress = useCallback(
    item => {
      navigation.navigate('MovieDetailScreen', { movieData: item });
    },
    [navigation],
  );

  useFocusEffect(
    useCallback(() => {
      onFetchListFavoriteMovie();
    }, []),
  );

  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Favorite"
          styles={tw.style('mx-4')}
          isOnBackPress={false}
        />
        {listFavoriteMovie.length === 0 ? (
          <View style={tw.style('flex-1 items-center justify-center')}>
            <ImgNoFavorite style={tw.style('mb-4')} />
            <Text
              style={tw.style(
                'text-base font-montserratSemiBold text-white mb-2',
              )}>
              There Is No Movie Yet!
            </Text>
            <Text
              style={tw.style(
                'text-sm font-montserrat text-textGrey mx-10 text-center',
              )}>
              Find your movie by Type title, categories, years, etc
            </Text>
          </View>
        ) : (
          <View style={tw.style('flex-1')}>
            <SearchSection
              value={searchText}
              onChangeText={onChangeSearch}
              onCancel={() => onChangeSearch('')}
              styles={tw.style('mx-4 mb-5 mt-4')}
              placeholder="Search Title, Realese Date, Genre"
            />
            <FlatList
              data={displayData}
              style={tw.style('px-4')}
              keyExtractor={item => {
                return item?.id?.toString();
              }}
              renderItem={({ item, index }) => (
                <CardList
                  key={index.toString()}
                  image={item?.posterPath}
                  title={item?.title}
                  relaseDate={item?.releaseDate}
                  rated={Number(item?.rated)}
                  genreName={getGenreNames(JSON.parse(item?.genres))}
                  onPressCard={() => handleMovieDetailPress(item)}
                />
              )}
            />
          </View>
        )}
      </View>
    </>
  );
}
