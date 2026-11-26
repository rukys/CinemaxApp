import auth from '@react-native-firebase/auth';

// Errors are rethrown as-is so callers keep access to `error.code`
// (e.g. 'auth/wrong-password') and can show a meaningful message.
function createAuthFirebase() {
  const registerWithEmail = async (email, password) => {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  };

  const loginWithEmail = async (email, password) => {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  };

  const logout = async () => {
    await auth().signOut();
  };

  const getCurrentUser = () => {
    return auth().currentUser;
  };

  const onAuthStateChanged = callback => {
    return auth().onAuthStateChanged(callback);
  };

  const reauthenticate = async password => {
    const user = auth().currentUser;
    if (!user?.email) {
      const error = new Error('No user is currently signed in.');
      error.code = 'auth/no-current-user';
      throw error;
    }
    const credential = auth.EmailAuthProvider.credential(user.email, password);
    await user.reauthenticateWithCredential(credential);
    return user;
  };

  const changePassword = async (oldPassword, newPassword) => {
    const user = await reauthenticate(oldPassword);
    await user.updatePassword(newPassword);
  };

  const sendPasswordReset = async email => {
    await auth().sendPasswordResetEmail(email);
  };

  return {
    registerWithEmail,
    loginWithEmail,
    logout,
    getCurrentUser,
    onAuthStateChanged,
    reauthenticate,
    changePassword,
    sendPasswordReset,
  };
}

// The functions do not depend on React state, so one shared instance keeps
// their references stable across renders (safe to use in hook deps).
const authFirebase = createAuthFirebase();

export default function useAuthFirebase() {
  return authFirebase;
}
