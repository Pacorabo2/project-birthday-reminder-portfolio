import React, {useState, useContext} from 'react'
import  { FirebaseContext } from '../Firebase'
import Button from '../Button'
import 'firebase/firestore'

import Swal from 'sweetalert2'
import './style.css'

const Uploadd = (props) => {

  const firebase = useContext(FirebaseContext)

  const [firstName, setFirstName] = useState(props.friendData.firstName)
  const [lastName, setLastName] = useState(props.friendData.lastName)
  const [birthDate, setBirthDate] = useState(props.friendData.birthDate)
  const [friendId, setFriendId] = useState(props.friendData.id)
  const [fileUrl , setFileUrl] = useState(props.friendData.fileUrl)

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    const storageRef = firebase.storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL())
    Swal.fire(
      'Bravo',
      `image ${file.name} téléchargée avec succés`,
      'success');
  }

  // Get today date
  let today = new Date().toISOString().split('T')[0]


  const updateFriend = () => { 
    firebase.revealFriend(firstName, lastName, birthDate, fileUrl, friendId)
    setFirstName('')
    setLastName('')
    setBirthDate('')
    setFriendId('')
    props.closeUploadModal()
    Swal.fire(
      `${firstName} a bien été modifié`,
      'success'
      )
  }

  // To show Button only if all inputs are implemented
  const btn = firstName === '' || lastName === '' || fileUrl === null ? 
  (<Button 
    disabled="true"
    type="button" 
    buttonStyle="btn--disabled--outline" 
    buttonSize="btn--medium"
  >
    Ajouter
  </Button>) 
  : (<Button onClick={updateFriend}
    type="button" 
    buttonStyle="btn--primary--outline" 
    buttonSize="btn--medium"
  >
    Ajouter
  </Button>)
  
  return (
    <div className="form">
        <input 
          type="text"
          required="required"
          placeholder={props.friendData.firstName} 
          value={firstName}
          onChange={e => setFirstName(e.target.value)}/>
        <input 
          type="text"
          required="required"
          placeholder={props.friendData.lastName} // *
          value={lastName}
          onChange={e => setLastName(e.target.value)}/>
        <input 
          type="date"
          required="required"
          placeholder={props.friendData.birthDate} // *
          value={birthDate}
          max={today}
          onChange={e => setBirthDate(e.target.value)}/>
        <input 
          type="file"
          required="required"
          placeholder={props.friendData.fileUrl} // *
          onChange={onFileChange} 
          /> 
          {btn} 
      </div>
  )
}

export default Uploadd
