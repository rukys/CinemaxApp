import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from '@react-native-firebase/auth';

// Errors are rethrown as-is so callers keep access to `error.code`
// (e.g. 'auth/wrong-password') and can show a meaningful message.
function createAuthFirebase() {
  const registerWithEmail = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password,
    );
    return userCredential.user;
  };

  const loginWithEmail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      getAuth(),
      email,
      password,
    );
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(getAuth());
  };

  const getCurrentUser = () => {
    return getAuth().currentUser;
  };

  const onAuthStateChanged = callback => {
    return onFirebaseAuthStateChanged(getAuth(), callback);
  };

  const reauthenticate = async password => {
    const user = getAuth().currentUser;
    if (!user?.email) {
      const error = new Error('No user is currently signed in.');
      error.code = 'auth/no-current-user';
      throw error;
    }
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    return user;
  };

  const changePassword = async (oldPassword, newPassword) => {
    const user = await reauthenticate(oldPassword);
    await updatePassword(user, newPassword);
  };

  const sendPasswordReset = async email => {
    await sendPasswordResetEmail(getAuth(), email);
  };

  const deleteAccount = async user => {
    await deleteUser(user);
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
    deleteAccount,
  };
}

// The functions do not depend on React state, so one shared instance keeps
// their references stable across renders (safe to use in hook deps).
const authFirebase = createAuthFirebase();

export default function useAuthFirebase() {
  return authFirebase;
}
