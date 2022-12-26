import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import { useState, useEffect } from 'react';
import { Link, useNavigate, Routes, BrowserRouter as Router, Route, Navigate, useLocation} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import SignupPage from './components/SignupPage';
import Signup from './components/Signup';
import {collection, query, onSnapshot, getDocs, where} from "firebase/firestore"
import {db} from './firebase'
import { useGetWeatherQuery}  from './services/weatherApi'



function App() {

  const  {weatherData, isFetching} = useGetWeatherQuery()
  const name = 'Login Title'
  const [toggle, setToggle] = useState(false);
  const [loggedUser, setLoggedUser] = useState({})
  const navigate = useNavigate();
  const [ userAvatar, setUserAvatar ] = useState({})
  const location = useLocation()
 
  const [token, setToken] = useState(false)
  // useEffect(() => {
  //   console.log(location.state.username)
  // }, [])

  //Search Users

  // const searchUsers = async (userRecord) => {
  //   // console.log('This is something: '+userRecord.username)
  //   const record = await fetch(`http://localhost:5000/users`, {
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(userRecord)
  //   })
  //   const data = await record.json()
  //   console.log(data)
  // }

  const searchUsers = async (recorded) => {
  const record = await fetch('http://localhost:5000/users')
  const resultant = await record.json()
  resultant.filter((findUser) => {
     if(findUser.username === recorded.username && findUser.password === recorded.password)
     {
      console.log('User is ', findUser.username);
      setToggle(true)
      setLoggedUser(findUser)
    
     }
  })
  }

  const searchFirestore = async (recorded) => {
    const record = query(collection(db, 'users'), where("username", "==", recorded.username));
    const querySnapshot = await getDocs(record);
    querySnapshot.forEach((doc) => {
    
      const user = doc.data()
      console.log(doc.data().avatar)
      // setUserAvatar(doc.data.avatar)
      // console.log(userAvatar)
      // doc.data() is never undefined for query doc snapshots
      setToggle(true)
      setLoggedUser(user)
      // return
      // console.log(doc.id, " => ", doc.data());
    });
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.data().username)
      //   if(doc.data().username === recorded.username && doc.data().password === recorded.password)
      //   {
      //     console.log('entered')
      //     setToggle(true)
      //   }
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
}

  
  

  return (
     
       
       
          <div className="App">
            {console.log(weatherData)}
            {/* <button onClick={yo}>hello</button> */}
            {/* <LoginForm title={name} addUser={searchUsers} /> */}
             {toggle === true ? <Dashboard onTrig = {loggedUser}/> : <LoginForm title={name} addUser={searchFirestore} />}
             {/* { success && <span style={{ color: "red" }} className="row">Password do not match</span>} */}
             
             {/* <Signup /> */}
             {/* /* <Link to="/dashboard">About</Link> */} 
             {/* <Routes><Route path='/dashboard' element={<Dashboard />} /></Routes> */}
          </div>

      
        
    
   
  );
}

export default App;
