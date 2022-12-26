import React, { useState } from 'react'
import { Route, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Messages from './Messages';
import AddFriend from './AddFriend';
import FriendList from './FriendList';
import handleChange from  "@material-ui/core/Tabs";
import {db} from '../firebase'
import {collection, query, onSnapshot, setDoc, doc, addDoc, where, getDocs, getValue, getDoc} from "firebase/firestore"
import FriendRequest from './FriendRequest';

const Dashboard = ({onTrig}) => {

  const navigate = useNavigate()
  const location = useLocation()
  const [friends, setFriends] = useState([])
  const [selectedValue, setSelectedValue] = useState(0)

  useEffect(() => {
    
    // console.log('triggered')
    fetchFriendList()
    
  },[])

  const fetchFriendList = async () => {
 
    const docRef = query(collection(db, "users"), where("username", "==", onTrig.username))
    const querySnapshot = await getDocs(docRef)
    querySnapshot.forEach(async (doc) => {
      const docRef = query(collection(db, "users", doc.id, "friends"))
      const querySnapshot = await getDocs(docRef)
      querySnapshot.forEach((document) => {
        const buddy = document.data()

        
            setFriends(friends => [...friends, buddy])

      })
    })
    
  }

  

  const renderTab = (val) => {
    setSelectedValue(val);
  }

  return (
    
    <div>
      <h3>Welcome {onTrig.username}</h3>
      <Paper Square>
      
        <Tabs
            
            value={selectedValue}
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            centered
          >
            <Tab label="Add Friend" onClick={() => renderTab(0)}/>
            <Tab label="Friend's List" onClick={() => renderTab(1)}/>
            <Tab label="Messages" onClick={() => renderTab(2)}/>  
            <Tab label="Friend Requests" onClick={() => renderTab(3)}/>  
          </Tabs>

        </Paper>
        {selectedValue === 0 && <AddFriend friendList={friends} onTrigger={onTrig}/>}
        {selectedValue === 1 && <FriendList onTrigger={onTrig}/>}
        {selectedValue === 2 && <Messages friendList={friends} authUser={onTrig}/>}
        {selectedValue === 3 && <FriendRequest onTrigger={onTrig}/>}
    </div>

  )
}

export default Dashboard
