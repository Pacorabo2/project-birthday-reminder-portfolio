import React, { Fragment, useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../Firebase'
import app from 'firebase/app'
import 'firebase/auth'
import Button from '../Button'
import Logout from '../Logout'
import Create from '../Create'
import Modal from '../Modal'

import './style.css'

const List = props => {

  const firebase = useContext(FirebaseContext)
  
  // Get user from firebase
  const userAuth = firebase.auth.X
  // tate definition
  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState({})
  const [friends, setFriends] = useState([])

  // To get friends from firebase acount
  useEffect(() => {
    app
     .firestore()
     .collection('users')
     .doc(userAuth)
     .collection("friends")
     .onSnapshot((snapshot) => {
       const newFriends = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data()
       }))

       setFriends(newFriends)
     })
  }, [friends])

  // To look if user is connected
  useEffect(() => {

    let listener = firebase.auth.onAuthStateChanged(user => {
       user ? setUserSession(user) : props.history.push('/')
    })
    if(!!userSession) {
      firebase.user(userSession.uid)
      .get()
      .then(doc => {
        if (doc && doc.exists) {
          const myData = doc.data()
          setUserData(myData)
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
    
    return () => {
      listener()
    }
  },[userSession])

  const showModal = (e) => {
    console.log(e.target)
  }


  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
      <p className="loaderText">Veuillez patienter</p>
    </Fragment>
  ) : (
    <>
    <Logout userData={userData} />
    <Modal/>
    <Create />
    {/* <Button
      buttonSize="btn--small"
      >Ajouter</Button> */}
    <div className="container">
    <h3>{`Vous avez ${friends.length} amis enregistrés`}</h3>
      {friends.map((friend) => {
        const { id, firstName, lastName, birthDate, fileUrl } = friend;
        return (
          <article key={id} className='person'>
            <img src={fileUrl} alt={firstName} />
            <div>
              <h4>{firstName + ' ' +lastName}</h4>
              <p>{birthDate} years</p>
            </div>
          </article>
        );
      })}
      <Button>Ajouter un Anniversaire</Button>
    </div>
    </>
  )
}

export default List
