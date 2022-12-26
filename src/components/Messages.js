import React, { useEffect } from 'react'
import { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@mui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import {collection, query, onSnapshot, setDoc, doc, addDoc, where, Timestamp, getDocs, getDoc, orderBy, Query} from "firebase/firestore"
import {db} from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from "uuid"
import { storage } from '../firebase'



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});



const Messages = ({friendList, authUser}) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ localMessage, setLocalMessage ] = useState('');
  const [selectedFriend, setSelectedFriend] = useState('')
  const [ displayMessage, setDisplayMessage] = useState([])
//   const [friendList, setFriendList] = useState([])
  const types = ['image/png' , 'image/jpeg']
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null);
  let renderCount = 0
  const [ so, setSo ] = useState(false)

  const classes = useStyles();



  useEffect(() => {
    // fetchFriendList()

    setDisplayMessage([]) 
    
    fetchMessageList()
    

  },[renderCount, selectedIndex])


 


  const fetchMessageList = () => {
    // displayMessage.length = 0

    
    const docRef = query(collection(db, "users"), where("username", "==", authUser.username))
      onSnapshot(docRef, (querySnapshot) => {
 
            querySnapshot.docs.map(async (doc) => {
            const docReference = query(collection(db, "users", doc.id , "friends"))
            onSnapshot(docReference, ((querySnapshot) => {
                querySnapshot.docs.map(async (document) => {
            
                    const doci = document.data()
                    // console.log(friendList[selectedIndex].username)
                    // setFriendList(friendList => [...friendList, doci])
                    if(doci.username === friendList[selectedIndex].username)
                    {
                        const docRef = query(collection(db, "users", doc.id, "friends", document.id, "messages"))
                        onSnapshot(docRef, ((querySnapshot) => {
                        querySnapshot.docs.map((document) => {

                            // console.log(document.data())
                            const budd = document.data()
                            if('messageMedia' in budd)
                            {
                                // console.log('media is ', budd)
                                setDisplayMessage(displayMessage => [...displayMessage, {
                                    messageMedia: document.data().messageMedia,
                                    time: document.data().created,
                                    // time: document.data().created.toLocaleTimeString(),
                                    type: document.data().type
                                }])
                            }

                            else
                            {
                                setDisplayMessage(displayMessage => [...displayMessage, {
                                    text: document.data().text,
                                    time: document.data().created,
                                    type: document.data().type
                                }])
                            }

                            
                           
                        })
                            
                        }))

                    }
                    
                    
                })
            }))
            
          })
         
      })

      
    //   displayMessage.map((to) => console.log(to))

      
  }

  const clicked = async (e) => {
    
   
    e.preventDefault()
    
    
    console.log('local Message is ',localMessage)

    // Adding message to senders "sent" messages
    if(localMessage)
    {
        const docRef = query(collection(db, "users"), where("username", "==", authUser.username))
      onSnapshot(docRef, ((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
              const docRef = query(collection(db, "users", doc.id, "friends"))
              onSnapshot(docRef, ((querySnapshot) => {
                  querySnapshot.docs.map(async (document) => {
                    const temp = document.data()
                    if(temp.username === friendList[selectedIndex].username)
                    {
                        const docRef = collection(db, "users", doc.id, "friends", document.id, "messages")
                        await addDoc(docRef, {
                            text: localMessage,
                            type: "sent",
                            created: Timestamp.now().toDate().toLocaleString()
                        })
                        // console.log(temp.data.username)
                    }
                  })
              }))
          })
      }))


      //Adding message to the recipients messages collection

      const docRef2 = query(collection(db, "users"), where("username", "==", friendList[selectedIndex].username))
      onSnapshot(docRef2, ((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
              const docRef = query(collection(db, "users", doc.id, "friends"))
              onSnapshot(docRef, ((querySnapshot) => {
                  querySnapshot.docs.map(async (document) => {
                    const temp = document.data()
                    if(temp.username === authUser.username)
                    {
                        const docRef = collection(db, "users", doc.id, "friends", document.id, "messages")
                        // console.log('message is ',localMessage)
                        // console.log(message)
                        await addDoc(docRef, {
                            text: localMessage,
                            type: "received",
                            created: Timestamp.now().toDate().toLocaleString()
                            // created: Timestamp.now()
                        })
                        // console.log(temp.data.username)
                    }
                  })
              }))
          })
      }))

      displayMessage.length = 0
      setLocalMessage('')
      renderCount++
    }
      
       
    }

    const changeHandler = async (e) => {
        // console.log('clicked')
        let selected = e.target.files[0]
        if(selected && types.includes(selected.type))
        {
        setFile(selected)
        // setFileError('')
        const imageRef = ref(storage, `messageMedia/${selected.name + v4()}`)
        
        uploadBytes(imageRef, selected).then(() => {
            console.log('upload done')  
        }).then(() => {
            getDownloadURL(imageRef).then((url) => {
            console.log(url)
            // setImage(url)
            // adding image to firestore
            const docRef = query(collection(db, "users"), where("username", "==", authUser.username))
                onSnapshot(docRef, ((querySnapshot) => {
                    querySnapshot.docs.map((doc) => {
                        const docRef = query(collection(db, "users", doc.id, "friends"))
                        onSnapshot(docRef, ((querySnapshot) => {
                            querySnapshot.docs.map(async (document) => {
                                const temp = document.data()
                                if(temp.username === friendList[selectedIndex].username)
                                {
                                    const docRef = collection(db, "users", doc.id, "friends", document.id, "messages")
                                    await addDoc(docRef, {
                                        messageMedia: url,
                                        type: "sent",
                                        created: Timestamp.now().toDate().toLocaleString()
                                    })
                                    // console.log(temp.data.username)
                                }
                            })
                        }))
                    })
                }))

                //adding image to recipient messages

                const docRef2 = query(collection(db, "users"), where("username", "==", friendList[selectedIndex].username))
                onSnapshot(docRef2, ((querySnapshot) => {
                    querySnapshot.docs.map((doc) => {
                        const docRef = query(collection(db, "users", doc.id, "friends"))
                        onSnapshot(docRef, ((querySnapshot) => {
                            querySnapshot.docs.map(async (document) => {
                                const temp = document.data()
                                if(temp.username === authUser.username)
                                {
        
                                    const docRef = collection(db, "users", doc.id, "friends", document.id, "messages")
                                    await addDoc(docRef, {
                                        messageMedia: url,
                                        type: "recieved",
                                        created: Timestamp.now().toDate().toLocaleString()
                                    })
                                    // console.log(temp.data.username)
                                }
                            })
                        }))
                    })
                }))
            })
        })

        }else
        {
        setFile(null)
        // setFileError('Invalid File Format')
        }
        displayMessage.length = 0
        setLocalMessage('')
        renderCount++
    }
        

  return (
      <div>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src={authUser.avatar} />
                        </ListItemIcon>
                        <ListItemText primary={authUser.username}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    {/* {friendList.map((friend, index) => console.log(index)) } */}
                    {friendList.map((friend, index) => <ListItem  selected={selectedIndex === index}
                        onClick={(event) => {
                            // renderCount++
                            console.log(index)
                            setSelectedIndex(index)
                            // console.log('selected index is ', selectedIndex)
                            setSelectedIndex(index)
                            // handleListItemClick(event, index, friend.data.username)
                            
                        }}>
                      <ListItemIcon >
                            <Avatar alt={friend.username} src={friend.avatar} />
                      </ListItemIcon> 
                      <ListItemText primary={friend.username}></ListItemText>
                      <ListItemText secondary="" align="right"></ListItemText>
                    </ListItem>)}
            
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    {displayMessage.sort(function (a, b) {
                    return a.time.localeCompare(b.time);
                    }).map((singleMessage) => <ListItem>
                    <Grid container>
                        <Grid item xs={12}>
                            
                           {singleMessage.type === "sent" && 'text' in singleMessage ? <ListItemText align="right" primary={singleMessage.text}></ListItemText> : <ListItemText align="left" primary={singleMessage.text}></ListItemText>}
                           {singleMessage.type === "sent" && 'messageMedia' in singleMessage ? <img className='avatar' src={singleMessage.messageMedia} align="right"/> : <img className='avatar' src={singleMessage.messageMedia} align="left"/> }
                           {singleMessage.type === "sent" ? <ListItemText align="right" secondary={singleMessage.time}></ListItemText> : <ListItemText align="left" secondary={singleMessage.time}></ListItemText>} 
                          
                        </Grid>
                        
                    </Grid>
                    </ListItem>)}
                    
                </List>
                <Divider />
                <form onSubmit={clicked}>    
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={10}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth value={localMessage} onChange={(e) => setLocalMessage(e.target.value)}/>
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" type="submit"><SendIcon /></Fab>
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="secondary"> <input type="file" onChange={changeHandler}/></Fab>
                                {/* <Fab color="secondary" type="file" onClick={changeHandler}><AddIcon /> </Fab> */}
                            
                        </Grid>
                        
                    </Grid>
                </form>
            </Grid>
        </Grid>
      </div>
  );
}

export default Messages;