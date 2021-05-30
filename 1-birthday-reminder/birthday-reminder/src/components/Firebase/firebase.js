import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
    this.storage = app.storage()
  }

  // Inscritpion method
  signupUser = (email, password) => 
  this.auth.createUserWithEmailAndPassword(email, password)
  
  // Connexion method
  loginUser = (email, password) => 
  this.auth.signInWithEmailAndPassword(email, password)

  // Disconect method
  signoutUser = () => this.auth.signOut()

  // Get forget password
  passwordReset = email => this.auth.sendPasswordResetEmail(email)

  // Get user id in database
  user = uid => this.db.doc(`users/${uid}`)
  
  // Add friend
  addFriend = (firstName, lastName, birthDate, fileUrl ) => {

    let userLogged = this.auth.currentUser.uid

    this.db.collection('users').doc(userLogged)
      .collection('friends').doc(document.id)
      .set({ firstName, lastName, birthDate, fileUrl })
      .catch((err) => {
        console.error(err)
      });

    console.log("friend added");
  }

  revealFriend = (firstName, lastName, birthDate, fileUrl, friendId) => {

    let userLogged = this.auth.currentUser.uid
    
    this.db.collection('users').doc(userLogged)
      .collection('friends').doc(friendId)
      .update({ firstName, lastName, birthDate, fileUrl })
      .catch((err) => {
        console.error(err)
      });

      console.log(`${firstName} a bien été modifié`);
  }
} 



export default Firebase;