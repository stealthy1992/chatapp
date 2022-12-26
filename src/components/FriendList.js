import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {db} from '../firebase'
import { useState, useEffect } from 'react'
import {collection, query, onSnapshot, setDoc, doc, addDoc, where, getDocs, getValue, getDoc} from "firebase/firestore"
import { useNavigate } from 'react-router-dom';
import Messages from './Messages';

const FriendList = ({onTrigger}) => {

  const [friends, setFriends] = useState([])
  const navigate = useNavigate()

  // console.log('frunctin hhh ',onTrigger)
  

  useEffect( () => {

    console.log(onTrigger)

    fetchFriendList()
    
    },[])
  

  const fetchFriendList = async () => {

 
    const docRef = query(collection(db, "users"), where("username", "==", onTrigger.username))
    const querySnapshot = await getDocs(docRef)
    querySnapshot.forEach(async (doc) => {
      const docRef = query(collection(db, "users", doc.id, "friends"))
      const querySnapshot = await getDocs(docRef)
      querySnapshot.forEach((document) => {

        // console.log(document.data())
        const buddy = document.data()
      
        // console.log(buddy.username)
        
            setFriends(friends => [...friends, buddy])
        //     console.log(friends)

      })
    })
    
  }


  return (
    <TableContainer component={Paper}>
          {/* <button className="row" onClick={fetchFriendList}>Button</button> */}
         {/* {friends.map((friend) => console.log('user data is ',friend.username))}  */}
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >User</TableCell>
                <TableCell >Photo</TableCell>
                <TableCell >Hobbies</TableCell>
                {/* <TableCell >Actions</TableCell> */}
          
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableRow> */}
            {friends.map((friend) => <TableRow>
                  <TableCell>
                    
                    {friend.username}
                  </TableCell>
                  <TableCell>
                    <img className='avatar' src={friend.avatar} />
                  </TableCell>
                  <TableCell>
                    
                    {friend.hobbies?.map((hobby) => {return hobby})}
                  </TableCell>
                  <div id="button" className="row1">
                    <button onClick={() => navigate('/messages', {state: {username: friend.username, photo: friend.avatar}})}>Message</button>
                  </div>
              {/* </TableRow> */}
               </TableRow>)}
            </TableBody>
        </Table>
      </TableContainer>
  )
}

export default FriendList
