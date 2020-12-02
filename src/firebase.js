import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAKTahyXgutKOBtaLAwAPhReEKdki2hpVI",
  authDomain: "fb-clone-a777a.firebaseapp.com",
  databaseURL: "https://fb-clone-a777a.firebaseio.com",
  projectId: "fb-clone-a777a",
  storageBucket: "fb-clone-a777a.appspot.com",
  messagingSenderId: "36437621860",
  appId: "1:36437621860:web:20814f99242c861eb63371",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export { provider, auth };
export default db;
