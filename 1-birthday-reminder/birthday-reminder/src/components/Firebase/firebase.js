import app from 'firebase/app'
import 'firebase/auth'

var config = {
  apiKey: "AIzaSyB0Ve-ntaidOXZfK7eP5WpD5OUqM_x8FMo",
  authDomain: "birthday-reminder-fdca4.firebaseapp.com",
  projectId: "birthday-reminder-fdca4",
  storageBucket: "birthday-reminder-fdca4.appspot.com",
  messagingSenderId: "340934199877",
  appId: "1:340934199877:web:3c8d6b0464a0dcc934712c"
};


class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
  }

  // Inscription
  signupUser = (email, password) => {
    this.auth.createUserWithEmailAndPassword(email, password)
  }

  // Connexion
  loginUser = (email, password) => {
    this.auth.signInWithEmailAndPassword(email, password)
  }

  // Déconnexion
  signoutUser = () => this.auth.signOut()
}

export default Firebase