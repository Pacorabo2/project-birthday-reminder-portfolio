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

  // ---------------- Fonction d'origine sans await ------------
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
    console.log(file);
    const storageRef = firebase.storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL())
    console.log(fileUrl);
  }
  
  return (
    <div className="create">
      <h4>Ajoutez anniversaire</h4>
      <div className="form">
        <input 
          type="text"
          placeholder="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}/>
        <input 
          type="text"
          placeholder="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}/>
        <input 
          type="date"
          placeholder="Date d'anniversaire"
          value={birthDate}
          onChange={e => setBirthDate(e.target.value)}/>
        <input 
          type="file"
          placeholder="Photo de profil"
          value={profilePict}
          onChange={onFileChange}/>
          <button
           onClick={createFriend}>Ajouter</button>
      </div>
    </div>
  )
}

export default Create
