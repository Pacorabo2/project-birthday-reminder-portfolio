import React, { useContext, useState } from 'react'
import  { FirebaseContext } from '../Firebase'
import 'firebase/firestore'

import './style.css'

const Create = (props) => {

  const firebase = useContext(FirebaseContext)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [profilePict , setProfilePict] = useState('')
  const [fileUrl , setFileUrl] = useState(null)

  // Get today date
  let today = new Date().toISOString().split('T')[0]


  const createFriend = () => {
    firebase.addFriend(firstName, lastName, birthDate, fileUrl)
    setFirstName('')
    setLastName('')
    setBirthDate('')
    setProfilePict('')
    props.closeModal()
  }

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    const storageRef = firebase.storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL())
    alert(`image ${fileUrl} téléchargée avec succés`);
  }
  
  return (
    <div className="create">
      <h4>Ajoutez un anniversaire</h4>
      <div className="form">
        <input 
          type="text"
          placeholder="firstName"
          required="required"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}/>
        <input 
          type="text"
          placeholder="lastName"
          required="required"
          value={lastName}
          onChange={e => setLastName(e.target.value)}/>
        <input 
          type="date"
          placeholder="Date d'anniversaire"
          required="required"
          value={birthDate}
          max={today}
          onChange={e => setBirthDate(e.target.value)}/>
        <input 
          type="file"
          placeholder="Photo de profil"
          required="required"
          value={profilePict}
          onChange={onFileChange}/>
          <button
           onClick={createFriend}>Ajouter</button>
      </div>
    </div>
  )
}

export default Create
