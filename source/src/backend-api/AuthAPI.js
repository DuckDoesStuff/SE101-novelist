import { auth ,createNew} from "./FirebaseConfig";

const signUpWithEmailAndPassword = (email, password) => {
  return createNew(email,password);
};

const signInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const signOut = () => {
  return auth.signOut();
};

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export {
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getCurrentUser,
};