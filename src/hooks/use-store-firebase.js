import firestore from '@react-native-firebase/firestore';

export default function useStoreFirebase() {
  // -- user --//
  const saveUserToFirestore = async userData => {
    try {
      const userRef = firestore().collection('users').doc(userData.id);
      await userRef.set(userData, { merge: true }); // merge: true to prevent overwriting
    } catch (error) {
      throw new Error('Failed to save user data: ' + error.message);
    }
  };

  const getUserFromFirestore = async uid => {
    try {
      const userDoc = await firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        return userDoc.data();
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error('Failed to get user data: ' + error.message);
    }
  };

  const updateUserToFirestore = async userData => {
    try {
      const userRef = firestore().collection('users').doc(userData.id);
      await userRef.update(userData);
    } catch (error) {
      throw new Error('Failed to update user data: ' + error.message);
    }
  };

  const deleteUserFireStore = async uid => {
    try {
      const docRef = firestore().collection('users').doc(uid);
      const snapshot = await docRef.get();
      if (!snapshot.exists) {
        throw new Error('User not found');
      }

      await docRef.delete();
      return snapshot.data();
    } catch (error) {
      throw new Error('Failed to delete user data: ' + error.message);
    }
  };

  const listenToUserData = (uid, callback) => {
    return firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          callback(doc.data());
        } else {
          callback(null);
        }
      });
  };
  // -- -- //

  // -- favorite movie --//
  const saveFavoriteMovie = async (movieData, uid) => {
    try {
      const favMovieRef = firestore()
        .collection('users')
        .doc(uid)
        .collection('favorite')
        .doc(movieData.id);

      await favMovieRef.set(movieData, { merge: true });
    } catch (error) {
      throw new Error('Failed to save favorite movie data: ' + error.message);
    }
  };

  const getListFavoriteMovie = async uid => {
    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(uid)
        .collection('favorite')
        .get();

      if (snapshot.empty) {
        return [];
      }

      const favoriteMovies = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return favoriteMovies;
    } catch (error) {
      throw new Error(
        'Failed to get favorite list movie data: ' + error.message,
      );
    }
  };

  const getFavoriteMovie = async (id, uid) => {
    try {
      const favMovieRef = await firestore()
        .collection('users')
        .doc(uid)
        .collection('favorite')
        .doc(id)
        .get();
      if (favMovieRef.exists) {
        return favMovieRef.data();
      } else {
        throw new Error('Favorite movie not found');
      }
    } catch (error) {
      throw new Error('Failed to get favorite movie data: ' + error.message);
    }
  };

  const deleteFavoriteMovie = async (id, uid) => {
    try {
      const docRef = firestore()
        .collection('users')
        .doc(uid)
        .collection('favorite')
        .doc(id);

      const snapshot = await docRef.get();

      if (!snapshot.exists) {
        throw new Error('Favorite movie not found');
      }

      await docRef.delete();
      return snapshot.data();
    } catch (error) {
      throw new Error('Failed to delete favorite movie data: ' + error.message);
    }
  };

  const deleteAllFavoriteMovie = async uid => {
    try {
      const docRef = firestore().collection('users').doc(uid);
      // Hapus subcollection favorite
      const favoriteSnapshot = await docRef.collection('favorite').get();
      const batch = firestore().batch();

      favoriteSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      throw new Error(
        'Failed to delete all favorite movie data: ' + error.message,
      );
    }
  };
  // -- -- //

  return {
    saveUserToFirestore,
    getUserFromFirestore,
    updateUserToFirestore,
    deleteUserFireStore,
    listenToUserData,

    saveFavoriteMovie,
    getFavoriteMovie,
    getListFavoriteMovie,
    deleteFavoriteMovie,
    deleteAllFavoriteMovie,
  };
}
