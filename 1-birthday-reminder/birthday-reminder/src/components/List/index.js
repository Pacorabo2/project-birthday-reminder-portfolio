import React, { Fragment, useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../Firebase'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import Button from '../Button'
import Logout from '../Logout'
import Create from '../Create'
import Uploadd from '../Uploadd'
import Modal from '../Modal'

import { RiPencilLine } from 'react-icons/ri'
import { RiDeleteBin2Line } from 'react-icons/ri'
import ReactTooltip from 'react-tooltip'
import Swal from 'sweetalert2'
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
  },[userAuth])

  

  // To delete Friends
  function deleteFriend(friend) {

    // Alert
    Swal.fire({
      title: `Vous allez supprimer ${friend.firstName} !`,
      text: `${friend.firstName} n'apparaîtra plus dans votre liste d'amis`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1aa179',
      cancelButtonColor: '#bb2525',
      confirmButtonText: 'Oui !',
      cancelButtonText: 'Non !',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimé!',
          `${friend.firstName} a bien été supprimé`,
          'success'
        )
        app
          .firestore()
          .collection('users')
          .doc(userAuth)
          .collection('friends').doc(friend.id).delete()
      }
    })
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
    setShowUpdateModal(true)
    setTimeout(function() {
    }, 2000)
  }

  // To close UploadModal
  const closeUploadModal = () => {
    setShowUpdateModal(false)
  }

  // To put an 's' if many friends
  const plur = friends.length > 1 ? "s" : ""


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
      <Modal showUpdateModal={showUpdateModal} friendData={friendData}>
        <div className="container">
          <p className="close" onClick={closeUploadModal}>X</p>
          <h3 className="modalTitle">{`Modification des informations de ${friendData.firstName}`}</h3>
          <Uploadd friendData={friendData} closeUploadModal={closeUploadModal}/>
        </div>
      </Modal>
    )
  } else {
    return (
      <>
    <Logout userData={userData} data-tip="Déconnexion"/>
    <div className="container">
    <h3>{`Vous avez ${friends.length} ami${plur} enregistré${plur}`}</h3>
      {friends.map((friend) => {
        const { id, firstName, lastName, birthDate, fileUrl } = friend;

        // One day Time in ms
        let oneDay = 1000 * 60 * 60 * 24

        //To set the present date
        let today = new Date()

        // To get the present year
        let currentYear = new Date().getFullYear()

        // Defined birthday
        let birthDay = new Date(birthDate) 

        // To define the day of the borthday
        let dayOfBirthday = birthDay.getDate()

        // To define the month of birthday
        let monthOfBirthday = birthDay.getMonth()

        // To define the year of birthday
        let yearOfBirthday = birthDay.getFullYear()

        // Add one year if birthday is < today 
        today.getMonth() >= monthOfBirthday && (today.getDate() + 1) > dayOfBirthday ? 
        birthDay.setFullYear(currentYear + 1) 
        : 
        birthDay.setFullYear(currentYear)
        
          
        // To calculate the result in ms and convertinfg into days
        let result = (Math.round(birthDay.getTime() - today.getTime()) / (oneDay)) + 1
        
        // to format the date
        let displayedResult = dayOfBirthday + "/" + (monthOfBirthday + 1) + "/" + yearOfBirthday
        
        // To remove the decimals from th result
        let daysRemaining = result.toFixed(0)
        
        return (
          <article key={id} className='person'>
            <div className="personDetails avatar">
              <img src={fileUrl} alt={firstName} />
            </div>
            <div className="personDetails infos">
              <h4>{firstName + ' ' +lastName}</h4>
              <p>Né(e) le {displayedResult}</p>
              <p>{`Anniversaire dans ${daysRemaining} jour${plur}`}</p>
            </div>
            <div className="personDetails icons">
              <button onClick={() => openUploadModal(friend)} ><RiPencilLine data-tip="Modifier"/><ReactTooltip/></button>
              <button onClick={() => deleteFriend(friend)} ><RiDeleteBin2Line data-tip="Supprimer"/></button>
            </div>
          </article>
        );
      })}
      <div className="footer">
        <Button type="button"
          buttonStyle="btn--primary--outline"
          buttonSize="btn--medium"
          onClick={openModal}
          // disabled={true}
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
