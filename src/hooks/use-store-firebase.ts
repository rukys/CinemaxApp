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
import type { FavoriteMovie, UserProfile } from '../types/user';

const userDoc = (uid: string) => doc(getFirestore(), 'users', uid);
const favoriteCollection = (uid: string) =>
  collection(getFirestore(), 'users', uid, 'favorite');
const favoriteDoc = (uid: string, id: string | number) =>
  doc(getFirestore(), 'users', uid, 'favorite', String(id));

const toError = (prefix: string, error: unknown) =>
  new Error(
    `${prefix}: ${error instanceof Error ? error.message : String(error)}`,
  );

function createStoreFirebase() {
  // -- user --//
  const saveUserToFirestore = async (userData: UserProfile) => {
    try {
      // merge: true to prevent overwriting
      await setDoc(userDoc(userData.id), userData, { merge: true });
    } catch (error) {
      throw toError('Failed to save user data', error);
    }
  };

  const getUserFromFirestore = async (uid: string): Promise<UserProfile> => {
    try {
      const snapshot = await getDoc(userDoc(uid));
      if (snapshot.exists()) {
        return snapshot.data() as UserProfile;
      }
      throw new Error('User not found');
    } catch (error) {
      throw toError('Failed to get user data', error);
    }
  };

  const updateUserToFirestore = async (
    userData: Partial<UserProfile> & { id: string },
  ) => {
    try {
      await updateDoc(userDoc(userData.id), userData);
    } catch (error) {
      throw toError('Failed to update user data', error);
    }
  };

  const updateUserCountryCode = async (uid: string, countryCode: string) => {
    try {
      // merge: true also works when the profile document does not exist yet.
      await setDoc(userDoc(uid), { countryCode }, { merge: true });
    } catch (error) {
      throw toError('Failed to update country code', error);
    }
  };

  // Deleting a missing document is a no-op in Firestore, so a user whose
  // profile document was never created can still delete their account.
  const deleteUserFireStore = async (uid: string) => {
    try {
      await deleteDoc(userDoc(uid));
    } catch (error) {
      throw toError('Failed to delete user data', error);
    }
  };

  const listenToUserData = (
    uid: string,
    callback: (user: UserProfile | null) => void,
  ) => {
    return onSnapshot(userDoc(uid), snapshot => {
      callback(snapshot.exists() ? (snapshot.data() as UserProfile) : null);
    });
  };
  // -- -- //

  // -- favorite movie --//
  const saveFavoriteMovie = async (movieData: FavoriteMovie, uid: string) => {
    try {
      await setDoc(favoriteDoc(uid, movieData.id), movieData, { merge: true });
    } catch (error) {
      throw toError('Failed to save favorite movie data', error);
    }
  };

  const getListFavoriteMovie = async (
    uid: string,
  ): Promise<FavoriteMovie[]> => {
    try {
      const snapshot = await getDocs(favoriteCollection(uid));

      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map(
        item => ({ ...item.data(), id: item.id } as FavoriteMovie),
      );
    } catch (error) {
      throw toError('Failed to get favorite list movie data', error);
    }
  };

  const getFavoriteMovie = async (
    id: string,
    uid: string,
  ): Promise<FavoriteMovie> => {
    try {
      const snapshot = await getDoc(favoriteDoc(uid, id));
      if (snapshot.exists()) {
        return snapshot.data() as FavoriteMovie;
      }
      throw new Error('Favorite movie not found');
    } catch (error) {
      throw toError('Failed to get favorite movie data', error);
    }
  };

  const deleteFavoriteMovie = async (id: string, uid: string) => {
    try {
      const docRef = favoriteDoc(uid, id);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        throw new Error('Favorite movie not found');
      }

      await deleteDoc(docRef);
      return snapshot.data() as FavoriteMovie;
    } catch (error) {
      throw toError('Failed to delete favorite movie data', error);
    }
  };

  const deleteAllFavoriteMovie = async (uid: string) => {
    try {
      // Hapus subcollection favorite
      const favoriteSnapshot = await getDocs(favoriteCollection(uid));
      const batch = writeBatch(getFirestore());

      favoriteSnapshot.forEach(item => {
        batch.delete(item.ref);
      });

      await batch.commit();
    } catch (error) {
      throw toError('Failed to delete all favorite movie data', error);
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
