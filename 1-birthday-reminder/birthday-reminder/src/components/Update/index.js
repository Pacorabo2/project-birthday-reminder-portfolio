import React, {useState, useContext} from 'react'
import  { FirebaseContext } from '../Firebase'
import 'firebase/firestore'

import './style.css'

const Update = (props) => {

  const firebase = useContext(FirebaseContext)

  const [firstName, setFirstName] = useState(props.friendData.firstName)
  const [lastName, setLastName] = useState(props.friendData.lastName)
  const [birthDate, setBirthDate] = useState(props.friendData.birthDate)
  const [friendId, setFriendId] = useState(props.friendData.id)
  const [profilePict , setProfilePict] = useState('') 
  const [fileUrl , setFileUrl] = useState(props.friendData.fileUrl)

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    const storageRef = firebase.storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL())
    alert(`image ${fileUrl} téléchargée avec succés`);
  }

  // Get today date
  let today = new Date().toISOString().split('T')[0]


  const updateFriend = () => { 
    firebase.revealFriend(firstName, lastName, birthDate, fileUrl, friendId)
    setFirstName('')
    setLastName('')
    setBirthDate('')
    setProfilePict('')
    setFriendId('')
    props.closeUploadModal()
    alert(`${firstName} a bien été modifié`)
  }
  
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
          value={profilePict}
          onChange={onFileChange} // A tester avec une autre valeur pour qu'il affiche le fichier choisi
          /> 
          <button onClick={updateFriend}>Ajouter</button> 
      </div>
  )
}

export default Update
