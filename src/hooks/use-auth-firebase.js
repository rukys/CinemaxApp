import auth from '@react-native-firebase/auth';

export default function useAuthFirebase() {
  const registerWithEmail = async (email, password) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getCurrentUser = () => {
    return auth().currentUser;
  };

  const onAuthStateChanged = callback => {
    return auth().onAuthStateChanged(callback);
  };

  return {
    registerWithEmail,
    loginWithEmail,
    logout,
    getCurrentUser,
    onAuthStateChanged,
  };
}
