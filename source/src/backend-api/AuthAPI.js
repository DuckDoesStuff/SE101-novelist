// import { auth , createNew } from "./FirebaseConfig";

// const signUpWithEmailAndPassword = (email, password) => {
//   return createNew(email,password);
// };

// // const signInWithEmailAndPassword = (email, password) => {
// //   return auth.signInWithEmailAndPassword(email, password);
// // };

// const signOut = () => {
//   return auth.signOut();
// };

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       unsubscribe();
//       resolve(user);
//     }, reject);
//   });
// };

// export {
//   signUpWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   getCurrentUser,
// };
// import firebase from 'firebase/app';
// import 'firebase/auth';

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

// const createUser = async (email, password) => {
//   try {
//     const user = await auth.createUserWithEmailAndPassword(email, password);
//     console.log('User created:', user);
//   } catch (error) {
//     console.log('Error creating user:', error);
//   }
// };

// export default createUser;
