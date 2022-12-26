import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import Dashboard from './Dashboard';

const FBRedirect = () => {

  const location = useLocation();
  const [flag, setFlag] = useState(false)
  const [temp, setTemp] = useState()

  useEffect(() => {
    setTemp({username: location.state.username, avatar: location.state.avatar})
    setFlag(true)

  },[])

  return (
    <div className="App">
      {/* {flag} */}
      {flag && <Dashboard onTrig={temp}/>}
      {/* {console.log(temp)} */}
     {/* <span>something is here</span> */}
    </div>
  )
}

export default FBRedirect
