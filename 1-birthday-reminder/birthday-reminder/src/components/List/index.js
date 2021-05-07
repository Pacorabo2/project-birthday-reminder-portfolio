import React, { Fragment, useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../Firebase'
import app from 'firebase/app'
import 'firebase/auth'
import Button from '../Button'
import Logout from '../Logout'
import Create from '../Create'
import data from '../../data'

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
  }, [])

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


  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
      <p className="loaderText">Veuillez patienter</p>
    </Fragment>
  ) : (
    <>
    <Logout userData={userData} />
    <Create />
    <div className="container">
    <h3>{}</h3>
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
      <Button/>
    </div>
    </>
  )
}

export default List
