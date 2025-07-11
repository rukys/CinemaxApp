/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
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
  const [filteredList, setFilteredList] = useState([]);
  const [listFavoriteMovie, setListFavoriteMovie] = useState([]);

  const getUser = userStore(state => state.user);

  const { getListFavoriteMovie } = useStoreFirebase();
  const { getGenreNames } = useMovieGenre();

  const onChangeSearch = val => {
    setSearchText(val);
    const lowercasedSearch = val.toLowerCase();
    const filtered = listFavoriteMovie.filter(item => {
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
    setFilteredList(filtered);
  };

  const onFetchListFavoriteMovie = () => {
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
  };

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
              onChangeText={text => {
                onChangeSearch(text);
              }}
              styles={tw.style('mx-4 mb-5 mt-4')}
              placeholder="Search Title, Realese Date, Genre"
            />
            <FlatList
              data={searchText === '' ? listFavoriteMovie : filteredList}
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
                  onPressCard={() => {
                    navigation.navigate('MovieDetailScreen', {
                      movieData: item,
                    });
                  }}
                />
              )}
            />
          </View>
        )}
      </View>
    </>
  );
}
