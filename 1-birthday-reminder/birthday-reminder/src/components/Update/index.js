import React, {useState, useContext} from 'react'
import  { FirebaseContext } from '../Firebase'
import 'firebase/firestore'

import './style.css'

const Update = (props) => {

  const firebase = useContext(FirebaseContext)
  

  const [firstName, setFirstName] = useState(props.friendData.firstName)
  const [lastName, setLastName] = useState(props.friendData.lastName)
  const [birthDate, setBirthDate] = useState(props.friendData.birthDate)
  const [profilePict , setProfilePict] = useState('')
  const [fileUrl , setFileUrl] = useState('')


  const firstNameChange = (e) => {
    setFirstName('')
    setFirstName(e.target.value)
  }

  const lastNameChange = (e) => {
    setLastName('')
    setLastName(e.target.value)
  }

  const birthDateChange = e => {
    setBirthDate(null)
    setBirthDate(e.target.value)
  }

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    console.log(file);
    const storageRef = firebase.storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL())
    alert(`image ${fileUrl} téléchargée avec succés`);
  }
  
  return (
    <div className="form">
        <input 
          type="text"
          placeholder={props.friendData.firstName} // *
          value={firstName}
          onChange={firstNameChange}/>
        <input 
          type="text"
          placeholder={props.friendData.lastName} // *
          value={lastName}
          onChange={lastNameChange}/>
        <input 
          type="date"
          placeholder={props.friendData.birthDate} // *
          value={birthDate}
          onChange={birthDateChange}/>
        <input 
          type="file"
          placeholder="Photo de profil" // *
          value={profilePict}
          onChange={onFileChange}/>
          <button
           onClick="#">Ajouter</button> 
      </div>
  )
}

export default Update
