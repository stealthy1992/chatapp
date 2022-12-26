import React from 'react'
import SignupPage from './SignupPage'
import { useState } from 'react';
import LoginForm from './LoginForm';
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App'
import Dashboard from './Dashboard';

const Signup = () => {

  // const [token, setToken] = useState(false);
  // const navigate = useNavigate()
  
  
  // const sent = () => {
  //   setComponent(true)
  // }
  return (
    // <Routes>
      <div id="button" className="row">
        <button>Sign Up</button>
        {/* <button onClick={() => setToken(true)}>Sign Up</button> */}
        {/* {token === true && <Routes><Route path="signuppage" element={<SignupPage />} /></Routes>} */}
          {/* {token === true ? <Routes><Route path="signuppage" element={<SignupPage />} /></Routes> : <Dashboard />} */}
        
        
        {/* <Routes><Route path="/" element={()=> token === true ? <SignupPage /> : 'nothing'} /></Routes> */}
        {/* {component && <Routes><Route exact path='/signuppage' element={<SignupPage />} /></Routes>} */}
        {/* {component === true ? <Routes><Route exact path='/signuppage' element={<SignupPage />} /></Routes>  : ''} */}
        {/* <Routes><Route path='/signuppage' element={<SignupPage />} /></Routes> */}
      </div>
    // </Routes>
  
   
    
  
  )
}

export default Signup
