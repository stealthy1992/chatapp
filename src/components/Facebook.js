import React from 'react'
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import FBRedirect from './FBRedirect';
import {db} from '../firebase'
import {collection, addDoc, Timestamp, getDocs, query, QuerySnapshot, onSnapshot} from 'firebase/firestore'
// import ImageUploading from 'react-images-uploading';
import { storage } from '../firebase'
import Dashboard from './Dashboard';
import LoginForm from './LoginForm';

const Facebook = ({props}) => {

  const [loggedUser, setLoggedUser] = useState()
  const [flag, setFlag] = useState(false)
  const navigate = useNavigate()
  let check = 0

  const responseFacebook = (response) => {
    // console.log(response);
    if (response.accessToken) {

      loggingIn(response)
      // console.log(response)
    } else {
      // setLogin(false);
    }
  }

  const loggingIn = async (response) => {

      const docRef = query(collection(db, "users"))
      const record = await getDocs(docRef)
      record.forEach( (doc) => {
        const temp = doc.data()
        console.log(response.name)
        console.log(temp.username)
        if(temp.username === response.name)
        {
          console.log('into')
          check = 1;
          setLoggedUser(temp)
          setFlag(true)
          // navigate('/', {state: {username: response.name, avatar: response.picture.data.url}})
  
          navigate('/fbredirect', {state: {username: response.name, avatar: response.picture.data.url}})
        }
        
      })
      console.log(check)
      if(check == 0)
      {
        // console.log('flag is here')
        const check = await addDoc(docRef, {
          username: response.name,
          avatar: response.picture.data.url
        })
        // console.log(check.data())
      }
  }

  
  return (
    // <a href="#" id="facebookIcon" />
    <div>
      {<FacebookLogin
    appId="711960479921347"
    // autoLoad={true}
    fields="name,email,picture"
    // onClick={responseFacebook}
    id="facebookIcon"
    callback={responseFacebook} 
    />}
   
   </div>
    
  )
}

export default Facebook
