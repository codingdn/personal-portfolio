import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC6h2BLGNOGwNFq6KljQJnhpZ6IgH1rE_k",
  authDomain: "personal-portfolio-b917f.firebaseapp.com",
  databaseURL: "https://personal-portfolio-b917f.firebaseio.com",
  projectId: "personal-portfolio-b917f",
  storageBucket: "personal-portfolio-b917f.appspot.com",
  messagingSenderId: "237857912577",
  appId: "1:237857912577:web:efdf531ebbacfb89294d00",
  measurementId: "G-C17Y92YYD7",
});

const db = firebaseApp.firestore();

export { db };
