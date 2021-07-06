import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDrZv9mpBjFeJykC7oeVaiRyO5zKVe7mko",
    authDomain: "indiaghumochat.firebaseapp.com",
    projectId: "indiaghumochat",
    storageBucket: "indiaghumochat.appspot.com",
    messagingSenderId: "917609179523",
    appId: "1:917609179523:web:65addeea928e996d506eb6",
    measurementId: "G-CQGNJ07K13"
  };
 const firebaseApp=firebase.initializeApp(firebaseConfig)

 const db=firebaseApp.firestore()

 const auth=firebase.auth()

 const provider=new firebase.auth.GoogleAuthProvider()

 export {auth,provider}
 export default db