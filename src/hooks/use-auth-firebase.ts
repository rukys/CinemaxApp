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
  type User,
} from '@react-native-firebase/auth';

// Errors are rethrown as-is so callers keep access to `error.code`
// (e.g. 'auth/wrong-password') and can show a meaningful message.
function createAuthFirebase() {
  const registerWithEmail = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password,
    );
    return userCredential.user;
  };

  const loginWithEmail = async (email: string, password: string) => {
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

  const onAuthStateChanged = (callback: (user: User | null) => void) => {
    return onFirebaseAuthStateChanged(getAuth(), callback);
  };

  const reauthenticate = async (password: string): Promise<User> => {
    const user = getAuth().currentUser;
    if (!user?.email) {
      throw Object.assign(new Error('No user is currently signed in.'), {
        code: 'auth/no-current-user',
      });
    }
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    return user;
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    const user = await reauthenticate(oldPassword);
    await updatePassword(user, newPassword);
  };

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(getAuth(), email);
  };

  const deleteAccount = async (user: User) => {
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
