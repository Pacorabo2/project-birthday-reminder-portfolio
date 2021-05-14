import React, { Fragment, useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../Firebase'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import Button from '../Button'
import Logout from '../Logout'
import Create from '../Create'
import Update from '../Update'
import Modal from '../Modal'
import UploadFriendModal from '../UploadFriendModal'

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
  const [friendData, setFriendData] = useState({})


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
  },[]) // friends

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
    openUploadModal()
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
    setShowModal(true)
  }

  // To close Modal
  const closeModal = () => {
    setShowModal(false)
  }


  // To open UploadModal and get frind to push on state
  const openUploadModal = (friend) => {
    // Ici j'ai accès à mon objet friend. Pour pouvoir m'en servir ailleur, il faudrait qu'il se troiuve
    // dans mon state. Pour l'instant ce n'est pas le cas. Pas grave, on va le faire.
    // On a vu que pour agir sur un state, on avait la méthode setState. étape 1 de la réflexion
    // J'ai une idée, si je défini un state vide de friend et qu'à la place de faire un console.log
    // je vienne faire un setstate pour ajouter mon friend{id, firstname, etc} 
    // On devrait pouvoir se servir de ce state pour le passer à d'autres composants non ?

    // Get friend datas on State
    setFriendData({
      birthDate: friend.birthDate,
      fileUrl: friend.fileUrl,
      firstName: friend.firstName,
      id: friend.id,
      lastName: friend.lastName
    })
    // console.log(`Je suis dans openUploadModal et setShowUpdateModal avant vaut: ${showUpdateModal}`);
    setShowUpdateModal(true)
    // console.log(`Je suis dans openUploadModal et setShowUpdateModal après vaut: ${showUpdateModal}`);
    setTimeout(function() {
      // console.log(friendData);
    }, 2000)
  }

  // To close UploadModal
  const closeUploadModal = () => {
    // console.log(`Je suis dans openUploadModal et setShowUpdateModal avant vaut: ${showUpdateModal}`);
    setShowUpdateModal(false)
    // console.log(`Je suis dans openUploadModal et setShowUpdateModal après vaut: ${showUpdateModal}`);
  }

  if (showModal) {

    return (
      <Modal showModal={showModal}>
        <div className="container">
          <p className="close" onClick={closeModal}>X</p>
          <Create closeModal={closeModal}/>
        </div>
      </Modal>
    )
  } else if (showUpdateModal) {
    return (
    
      <UploadFriendModal showUpdateModal={showUpdateModal} friendData={friendData}>
        <div className="container">
          <p className="close" onClick={closeUploadModal}>X</p>
          <h3 className="modalTitle">{`Modification des informations de ${friendData.firstName}`}</h3>
          <Update friendData={friendData} closeUploadModal={closeUploadModal}/>
        </div>
      </UploadFriendModal>
    )
  } else {
    return (
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
              <button onClick={() => openUploadModal(friend)}><RiPencilLine/></button>
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
}

export default List
