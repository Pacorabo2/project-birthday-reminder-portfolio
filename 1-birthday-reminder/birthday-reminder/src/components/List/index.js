import React, { Fragment, useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../Firebase'
import app from 'firebase/app'
import 'firebase/auth'
import Button from '../Button'
import Logout from '../Logout'
import Create from '../Create'
import Modal from '../Modal'

import { RiPencilLine } from 'react-icons/ri'
import { RiDeleteBin2Line } from 'react-icons/ri'
import './style.css'

const List = props => {

  const firebase = useContext(FirebaseContext)
  
  // Get user from firebase
  const userAuth = firebase.auth.X
  // tate definition
  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState({})
  const [friends, setFriends] = useState([])
  const [showModal, setShowModal] = useState(false)

  

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

  // To open Modal
  const openModal = e => {
    console.log('show');
    setShowModal(prev => !prev)
    console.log(showModal);
  }

  // To open Modal
  const closeModal = e => {
    console.log('show');
    setShowModal(prev => !prev)
    console.log(showModal);
  }
    return showModal === true ? (
      <Modal showModal={showModal} setShowModal={setShowModal} >
      <div className="container">
        <p className="close" onClick={closeModal}>X</p>
      <Create />
      </div>
    </Modal>
    ) : (
    <>
    <Logout userData={userData} />
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
            <div className="person__icons">
              <button href="#"><RiPencilLine/></button>
              <button href="#"><RiDeleteBin2Line/></button>
            </div>
          </article>
        );
      })}
      <div className="footer">
        <Button type="button"
          buttonStyle="btn--primary--outline"
          buttonSize="btn--medium"
          onClick={openModal}
          >
            Ajouter un Anniversaire
        </Button>
      </div>
    </div>
    
    </>
  )
}

export default List
