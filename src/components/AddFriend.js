
import { useState, useEffect } from 'react'
import {collection, query, onSnapshot, setDoc, doc, addDoc, where, getDocs} from "firebase/firestore"
import {db} from '../firebase'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar } from '@material-ui/core/Avatar';
import CircularProgress from '@mui/material/CircularProgress';



const AddFriend = ({onTrigger}) => {

  let result = []
  const [addedUsers, setAddedUsers] = useState([])
  const [friends, setFriends] = useState([])
  const [name, setName] = useState('')
  const [requestFlag, setRequestFlag] = useState(false)
  const [ allUsers, setAllUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [trigger, setTrigger] = useState(false)
  let final

  useEffect(() => {

    fetchUsers().then(() => newfunc())

    // result.map((res) => console.log(res.username))
    // setIsLoading(false)
    
  },[])

  const newfunc = () => {
    // setIsLoading(false)
  }

  const fetchUsers = async () => {

    const docRef2 = query(collection(db, "users"))
    const record2 = await getDocs(docRef2)
    record2.forEach(async (doc) => {
      const temp = doc.data()
      // console.log(temp.username)
      if(temp.username !== onTrigger.username)
      {
        console.log('trig')
        setAllUsers(allUsers => [...allUsers, temp])
      }
      else if(temp.username === onTrigger.username)
      {
        const docRef = query(collection(db, "users", doc.id, "friends"))
        const record = await getDocs(docRef)
        record.forEach((doc) => {
          const temp2 = doc.data()
          
          setAddedUsers(addedUsers => [...addedUsers, temp2])
        })
      }
    })

  }
 

  const handleChange = (event) => {
    setName(event.target.value) 
    // console.log(name)
  };

  const sendRequest = async (value) => {

   const docRef = query(collection(db, "users"), where("username", "==", value.username))
    onSnapshot(docRef, ((querySnapshot) => {
      querySnapshot.docs.map(async (document) => {
        const colRef = collection(db,"users", document.id, "friendRequests")
        await addDoc(colRef, {
          username: onTrigger.username,
          // password: onTrigger.password,
          avatar: onTrigger.avatar
        })
      })
    }))

    setRequestFlag(true)
    
    
    
  }
   
  return (
    <div>
        {/* {allUsers.map((use) => console.log(use.username))} */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >User</TableCell>
                <TableCell >Photo</TableCell>
                <TableCell >Hobbies</TableCell>
                <TableCell >Actions</TableCell>
          
              </TableRow>
            </TableHead>
            {/* {console.log(isLoading)} */}
            <TableBody>
             
              {allUsers.filter(({ username: id1 }) => !addedUsers.some(({ username: id2 }) => id2 === id1)).map((friend) => 
                
              <TableRow>
                <TableCell>
                  {friend.username}
                </TableCell>
                <TableCell>
                  <img className="avatar" src={friend.avatar}/>
                </TableCell>
                <TableCell>
                  {friend.hobbies?.map((hobby) => {return hobby})}
                </TableCell>
                  <div id="button" className="row1">
                    <button onClick={() => sendRequest(friend)}>Add</button>
                  </div>
              </TableRow>
              )}
            </TableBody>

            
            
        </Table>
      </TableContainer>
      {requestFlag && <span style={{ color: "black" }} className="row">Request sent successfully</span>}
        
    </div>
  )
}

export default AddFriend
