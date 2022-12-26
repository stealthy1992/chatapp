import { Link, useNavigate }from 'react-router-dom'
import { useState, useEffect } from 'react';
import {db} from '../firebase'
import {collection, addDoc, Timestamp, getDocs, query, QuerySnapshot, onSnapshot} from 'firebase/firestore'
import ImageUploading from 'react-images-uploading';
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from "uuid"





const SignupPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState(false)
  const [users, setUsers] = useState([])
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();
  const [userError, setUserError] = useState(false)
  const [UNF, setUNF] = useState(false)
  const [file, setFile] = useState(null);
  const types = ['image/png' , 'image/jpeg']
  const [fileError, setFileError] = useState(null)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [imageError, setImageError] = useState(false)


  useEffect(() => {
    const docRef = query(collection(db, "users"))
        getDocs(docRef).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const temp = doc.data()
          
            setUsers(users => [...users, temp])
            
          })

      })
  },[])

  
  const onSubmit =  (e) => {
    e.preventDefault();
  
    if(username && password)
    {
      if(password === confirmPassword){

        if(profilePhoto)
        {
          users.map((user) => {
            if(user.username === username)
            {
              users.length = 0
            } 
          })
  
          if(users.length === 0)
          {
            console.log('empty')
            setUserError(true)
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            const docRef = query(collection(db, "users"))
                getDocs(docRef).then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    const temp = doc.data()
                  
                    setUsers(users => [...users, temp])
                    
                  })
  
            })
          }
          else
          {
            const rec = addDoc(collection(db, "users"), {
              username: username,
              password: password, 
              avatar: profilePhoto
            })
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            setSuccess(true)
            navigate('/')
          }
  
        }
        else
        {
          setImageError(true)
        }

      }
      else
      {
        setErr(true)
      }
   
    }
    else{
      setUNF(true)
    }

    if(imageError)
    {
      setImageError(false)
    }
    if(err)
    {
      setErr(false)
    }
    if(UNF)
    {
      setUNF(false)
    }
    
}



  const callData = async () => {
    const data = await fetch(`http://localhost:5000/users`)
    const res = await data.json()
    console.log('huaaa', res)
  }

  const getSignupUser = async (user) => {
      // console.log('something ', user)
      const res = await fetch(`http://localhost:5000/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      console.log('result here is ', res)
      const data = await res.json()
      // console.log('data is', data)

  setUsers([...users, data])
  setSuccess(true)
  navigate('/');
  console.log(users)
  }



  const changeHandler = async (e) => {
    let selected = e.target.files[0]
    if(selected && types.includes(selected.type))
    {
      setFile(selected)
      setFileError('')
      const imageRef = ref(storage, `profilePhoto/${selected.name + v4()}`)
      
      uploadBytes(imageRef, selected).then(() => {
        console.log('upload done')  
      }).then(() => {
        getDownloadURL(imageRef).then((url) => {
          console.log(url)
          setProfilePhoto(url)
        })
      })

      
      // getDownloadURL(imageRef).then((url) => console.log(url))
      
      // getDownloadURL(imageRef).then((url) => console.log(url))
    }else{
      setFile(null)
      setFileError('Invalid File Format')
    }
  }

  return (
    <div id="loginform">
      {/* {users.map((user) => console.log(user))} */}
        <h2 id="headerTitle">Sign Up</h2>
        <div>
          <form onSubmit={onSubmit}>
            <div className="row">
              <label>Username</label>
              <input type="text" placeholder="Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="row">
              <label>Password</label>
              <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="row">
              <label>Confirm Password</label>
              <input type="password" placeholder="Re-enter Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div id="button" className="row">
              <input type="file" onChange={changeHandler}/>
            </div>

            {/* Image Upload Module Starts */}

            

            {/* Image Upload Module Ends */}


            {err && <span style={{ color: "red" }} className="row">Password do not match</span>}
            {userError && <span style={{ color: "red" }} className="row">Username already exists</span>}
            {UNF && <span style={{ color: "red" }} className="row">Username/Password cannot be empty</span>}
            {fileError && <span style={{ color: "red" }} className="row">{fileError}</span>}
            {imageError && <span style={{ color: "red" }} className="row">Image is required</span>}
            <div id="button" className="row">
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default SignupPage
