import React, { Fragment, useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../Firebase'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
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

  // State definition
  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState({})
  const [friends, setFriends] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  

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
  },[])

  // To delete Friends
  function deleteFriend(friend) {
    app
    .firestore()
    .collection('users')
    .doc(userAuth)
    .collection('friends').doc(friend.id).delete()
  }

  // To upload Friend
  function uploadFriend(friend){
    console.log(friend.id);
    openModal()
    app
    .firestore()
    .collection('users')
    .doc(userAuth)
    .collection('friends').doc(friend.id).set({})
  }


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
  const openModal = () => {
    setShowModal((prev) => !prev)
  }

  // To close Modal
  const closeModal = () => {
    setShowModal((prev) => !prev)
  }

  // To open UploadModal
  const openUploadModal = () => {
    setShowUpdateModal((prev) => !prev)
  }

  // To close UploadModal
  const closeUploadModal = () => {
    setShowUpdateModal((prev) => !prev)
  }

    return showModal === true ? (
      <Modal showModal={showModal}  >
        <div className="container">
          <p className="close" onClick={closeModal}>X</p>
          <Create closeModal={closeModal}/>
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
            <div className="personDetails avatar">
              <img src={fileUrl} alt={firstName} />
            </div>
            <div className="personDetails infos">
              <h4>{firstName + ' ' +lastName}</h4>
              <p>{birthDate} years</p>
            </div>
            <div className="personDetails icons">
              <button onClick={() => uploadFriend(friend)}><RiPencilLine/></button>
              <button onClick={() => deleteFriend(friend)}><RiDeleteBin2Line/></button>
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
