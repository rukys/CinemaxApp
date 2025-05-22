import firestore from '@react-native-firebase/firestore';

export default function useStoreFirebase() {
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
  return { saveUserToFirestore, getUserFromFirestore, listenToUserData };
}
