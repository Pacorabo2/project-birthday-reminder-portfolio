import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyB0Ve-ntaidOXZfK7eP5WpD5OUqM_x8FMo",
  authDomain: "birthday-reminder-fdca4.firebaseapp.com",
  projectId: "birthday-reminder-fdca4",
  storageBucket: "birthday-reminder-fdca4.appspot.com",
  messagingSenderId: "340934199877",
  appId: "1:340934199877:web:3c8d6b0464a0dcc934712c"
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
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
  // user = uid => this.db.collection("users").doc(`${uid}`).collection('friends').doc('friend')
  user = uid => this.db.doc(`users/${uid}`)
  
  // Add friend
  addFriend = (firstName, lastName, birthDate ) => {

    /** On récupère l'objet en rapport avec l'utilisateur il contient toutes
     * les informations nécessaires comme, le token, l'email, l'uid, etc
     * il servira surement plus d'une fois
     */
    // let userLogged = this.auth.currentUser

    /** On isole l'id de notre utilisateur qu'on vient enrigistrer dans
     * une variable
     */
    let userLogged = this.auth.currentUser.uid
    console.log(userLogged);

    this.db.collection('users').doc(userLogged)
      .collection('friends').doc(document.id).set({ firstName, lastName, birthDate })

      console.log("friend added");
  }

  // Get all friends
  getAllFriends = () => {

    let userLogged = this.auth.currentUser.uid
    console.log(userLogged);
    /** ---------------------------- Affiche en console chaque id de chaque document ---------- */
    this.db.collection('users').doc(userLogged).collection('friends').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        console.log('forEach');
        console.log(doc.data())
      })
    })
  }
}



export default Firebase