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
  const [dayDate, setDayDate] = useState(null)


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
  },[userAuth])

  // Ici, on récupère la liste des friends
  // console.log(friends)

  // To countdown birtday
  const birthdayCountDown = () => {
    
    friends.map((friend) => {
      // Définissons l'année courante
      let currentYear = new Date().getFullYear()
      // L'année N+1
      let nextYear = currentYear + 1
      // Récupérer le mois en cours
      const dateNow = new Date();
      const currentMonth = (dateNow.getMonth()) + 1
      // On défini la date d'anniversaire
      let birthDay = new Date(friend.birthDate)
      console.log(`l'anniversaire de ${friend.firstName} est le ${birthDay}`);
      // On en récupère le mois
      const birtDayMonth = (birthDay.getMonth()) + 1
      console.log(`le mois d'anniversaire de  ${friend.firstName} est le ${birtDayMonth}`);
      const  currentYearCountDown = () => {
          birthDay.setFullYear(currentYear)
          // On récupère le Time du jour
          const timeToday = dateNow.getTime()
          // On récupère le time de l'anniversaire
          const currentYearBirthTime = birthDay.getTime() 
          // On calcule la différence de Time entre l'anniversaire à venir 
          // et le Time de maintenant
          const distCurrentYear = currentYearBirthTime - timeToday
          // On convertit le résultat qui est en milisecondes en nombre de jours
          const dDayCurrentYear = Math.floor(distCurrentYear / (1000 * 60 * 60 * 24)) + 1
          console.log(`il reste ${dDayCurrentYear} jours avant l'anniversaire`)
      }
      const nextYearCountDown = () => {
          birthDay.setFullYear(nextYear)
          // On récupère le Time du jour
          const timeToday = dateNow.getTime()
          // On récupère le time de l'anniversaire
          const currentYearBirthTime = birthDay.getTime() 
          // On calcule la différence de Time entre l'anniversaire à venir 
          // et le Time de maintenant
          const distCurrentYear = currentYearBirthTime - timeToday
          // On convertit le résultat qui est en milisecondes en nombre de jours
          const dDayCurrentYear = Math.floor(distCurrentYear / (1000 * 60 * 60 * 24)) + 1
          console.log(`il reste ${dDayCurrentYear} jours avant l'anniversaire`)
      }
      // Si le mois d'anniversaire est plus grand que le mois en cours
      if (birtDayMonth > currentMonth) {
          currentYearCountDown()
      } else {
          nextYearCountDown()
      }
    })
  }

  birthdayCountDown()

  // birthdayCountDown()

  // To delete Friends
  function deleteFriend(friend) {
    
    app
    .firestore()
    .collection('users')
    .doc(userAuth)
    .collection('friends').doc(friend.id).delete()
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
  },[userSession, firebase, firebase.history, props.history])

  // To open Modal
  const openModal = () => {
    setShowModal(true)
  }

  // To close Modal
  const closeModal = () => {
    setShowModal(false)
  }

  // To open UploadModal and get friend to push on state
  const openUploadModal = (friend) => {
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

  

  // console.log(friendData);

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
