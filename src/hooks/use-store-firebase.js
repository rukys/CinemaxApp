import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from '@react-native-firebase/firestore';

const userDoc = uid => doc(getFirestore(), 'users', uid);
const favoriteCollection = uid =>
  collection(getFirestore(), 'users', uid, 'favorite');
const favoriteDoc = (uid, id) =>
  doc(getFirestore(), 'users', uid, 'favorite', String(id));

function createStoreFirebase() {
  // -- user --//
  const saveUserToFirestore = async userData => {
    try {
      // merge: true to prevent overwriting
      await setDoc(userDoc(userData.id), userData, { merge: true });
    } catch (error) {
      throw new Error('Failed to save user data: ' + error.message);
    }
  };

  const getUserFromFirestore = async uid => {
    try {
      const snapshot = await getDoc(userDoc(uid));
      if (snapshot.exists()) {
        return snapshot.data();
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error('Failed to get user data: ' + error.message);
    }
  };

  const updateUserToFirestore = async userData => {
    try {
      await updateDoc(userDoc(userData.id), userData);
    } catch (error) {
      throw new Error('Failed to update user data: ' + error.message);
    }
  };

  const updateUserCountryCode = async (uid, countryCode) => {
    try {
      // merge: true also works when the profile document does not exist yet.
      await setDoc(userDoc(uid), { countryCode }, { merge: true });
    } catch (error) {
      throw new Error('Failed to update country code: ' + error.message);
    }
  };

  // Deleting a missing document is a no-op in Firestore, so a user whose
  // profile document was never created can still delete their account.
  const deleteUserFireStore = async uid => {
    try {
      await deleteDoc(userDoc(uid));
    } catch (error) {
      throw new Error('Failed to delete user data: ' + error.message);
    }
  };

  const listenToUserData = (uid, callback) => {
    return onSnapshot(userDoc(uid), snapshot => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      } else {
        callback(null);
      }
    });
  };
  // -- -- //

  // -- favorite movie --//
  const saveFavoriteMovie = async (movieData, uid) => {
    try {
      await setDoc(favoriteDoc(uid, movieData.id), movieData, { merge: true });
    } catch (error) {
      throw new Error('Failed to save favorite movie data: ' + error.message);
    }
  };

  const getListFavoriteMovie = async uid => {
    try {
      const snapshot = await getDocs(favoriteCollection(uid));

      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map(item => ({
        id: item.id,
        ...item.data(),
      }));
    } catch (error) {
      throw new Error(
        'Failed to get favorite list movie data: ' + error.message,
      );
    }
  };

  const getFavoriteMovie = async (id, uid) => {
    try {
      const snapshot = await getDoc(favoriteDoc(uid, id));
      if (snapshot.exists()) {
        return snapshot.data();
      } else {
        throw new Error('Favorite movie not found');
      }
    } catch (error) {
      throw new Error('Failed to get favorite movie data: ' + error.message);
    }
  };

  const deleteFavoriteMovie = async (id, uid) => {
    try {
      const docRef = favoriteDoc(uid, id);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        throw new Error('Favorite movie not found');
      }

      await deleteDoc(docRef);
      return snapshot.data();
    } catch (error) {
      throw new Error('Failed to delete favorite movie data: ' + error.message);
    }
  };

  const deleteAllFavoriteMovie = async uid => {
    try {
      // Hapus subcollection favorite
      const favoriteSnapshot = await getDocs(favoriteCollection(uid));
      const batch = writeBatch(getFirestore());

      favoriteSnapshot.forEach(item => {
        batch.delete(item.ref);
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
    updateUserCountryCode,
    deleteUserFireStore,
    listenToUserData,

    saveFavoriteMovie,
    getFavoriteMovie,
    getListFavoriteMovie,
    deleteFavoriteMovie,
    deleteAllFavoriteMovie,
  };
}

// The functions do not depend on React state, so one shared instance keeps
// their references stable across renders (safe to use in hook deps).
const storeFirebase = createStoreFirebase();

export default function useStoreFirebase() {
  return storeFirebase;
}
