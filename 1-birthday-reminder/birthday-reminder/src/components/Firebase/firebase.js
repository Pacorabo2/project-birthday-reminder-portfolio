import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

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
      .collection('friends').doc(document.id).set({ firstName, lastName, birthDate, fileUrl })

    console.log("friend added");
  }

  // Update
  // revealFriend = (firstName, lastName, birthDate, fileUrl, friendId) => {

  //   let userLogged = this.auth.currentUser.uid
  //   // console.log(`Dans la fonction reveal de firebase ${firstName}`);
  //   console.log(`Dans la fonction reveal de firebase  ${firstName}`);
  //   console.log(`Dans la fonction reveal de firebase  ${lastName}`);
  //   console.log(`Dans la fonction reveal de firebase  ${birthDate}`);
  //   console.log(`Dans la fonction reveal de firebase  ${fileUrl}`);
  //   console.log(`Dans la fonction reveal de firebase  ${friendId}`);
  //   this.db.collection('users').doc(userLogged)
  //     .collection('friends').doc(friendId)
  //     .update({'birthdate': birthDate, 
  //              'fileUrl': fileUrl, 
  //              'fisrtName': firstName, 
  //              'lastName': lastName})
  //     .catch((err) => {
  //       console.error(err)
  //     });
  revealFriend = (updatedFriend) => {

    console.log(updatedFriend.friendId)
    console.log(updatedFriend)

    let userLogged = this.auth.currentUser.uid
    
    this.db.collection('users').doc(userLogged)
      .collection('friends').doc(updatedFriend.friendId)
      .set(updatedFriend)
      .catch((err) => {
        console.error(err)
      });

      console.log(`${updatedFriend.firstName} a bien été modifié`);
    
  } 

  // Get all friends
  getAllFriends = () => {

    let userLogged = this.auth.currentUser.uid
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