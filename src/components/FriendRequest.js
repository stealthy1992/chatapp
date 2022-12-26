import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {doc, collection, query, onSnapshot, where, deleteDoc, addDoc} from "firebase/firestore"

const FriendRequest = ({onTrigger}) => {

  const [friendRequests, setFriendRequests] = useState([])
  const [renderCount, setRenderCount] = useState(false)

  useEffect(() => {
    fetchFriendRequests()
    
  },[renderCount])

  const fetchFriendRequests = async () => {

    console.log(renderCount)
    console.log('called here')
    const docRef = query(collection(db, "users"), where("username", "==", onTrigger.username))
    onSnapshot(docRef, ((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        const docRef = query(collection(db, "users", doc.id, "friendRequests"))
        onSnapshot(docRef, ((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            const temp = doc.data()
            setFriendRequests(friendRequests => [...friendRequests, temp])
          })
        }))
      })
    }))

    setRenderCount(false)
    
  }

  const requestDeclined = (record) => {
    // console.log(record.data.username)
    const docRef = query(collection(db, "users"), where("username", "==", onTrigger.username))
    onSnapshot(docRef, ((querySnapshot) => {
      querySnapshot.docs.map((doci) => {
        const docRef = query(collection(db, "users", doci.id, "friendRequests"))
        onSnapshot(docRef, ((querySnapshot) => {
          querySnapshot.docs.map(async (document) => {
            const temp = document.data()
            if(temp.username === record.username)
            {
              // console.log(temp.data.username)
              const docRef = doc(db, "users", doci.id, "friendRequests", document.id)
              deleteDoc(docRef).then(setRenderCount(true))
              
              // console.log('couter is ', renderCount)
            }
            
            
          })
        }))
      })
    }))
    // setFriendRequests(friendRequests.filter((rec) => {return rec.data.username != record.data.username} ))
    friendRequests.length = 0
    // console.log(friendRequests.length)
    console.log(renderCount)
    // setRenderCount(true)
    
  }

  const requestAccept = (val) => {

    // console.log(val.data.username)

    // code to add record to both sender friend list and receiver friend list

    const record = query(collection(db, 'users'), where("username", "==", onTrigger.username));
    onSnapshot(record, ((querySnapshot) => {
      querySnapshot.docs.map(async (document) => {
       
        const colRef = collection(db, "users", document.id, "friends")
        await addDoc(colRef, {
          username: val.username,
          avatar: val.avatar
        }
         
        )
        
      })
    }))
    
    const docRef = query(collection(db, "users"), where("username", "==", val.username))
    onSnapshot(docRef, ((querySnapshot) => {
      querySnapshot.docs.map(async (document) => {
        const colRef = collection(db,"users", document.id, "friends")
        await addDoc(colRef,  {
          username: onTrigger.username,
          avatar: onTrigger.avatar
        }
        )
      })
    }))

    // code ends

    requestDeclined(val)

    // setFriendRequests(friendRequests.filter((rec) => {return rec.data.username != record.data.username} ))
    // renderCount++

  }




  return (
    <div>
      {/* <span>Friend Request</span> */}
      {/* {friendRequests.map((doc) => console.log(doc.data.username))} */}

    <TableContainer component={Paper}>
          {/* <button className="row" onClick={fetchFriendList}>Button</button> */}
         {/* {friendRequests.map((friend) => console.log('user data is ',friend.username))}  */}
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
            {friendRequests.map((friend) => <TableRow>
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
                    <button onClick={() => requestAccept(friend)}>Accept</button>
                  </div>
                  <div id="button" className="row1">
                    <button onClick={() => requestDeclined(friend)}>Decline</button>
                  </div>
              {/* </TableRow> */}
               </TableRow>)}
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default FriendRequest
