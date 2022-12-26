import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormInput = ({getUser}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(false);
  const [err, setErr] = useState(false)
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(username, password)
    if(username && password)
    {
      getUser({username, password})
      setUsername('')
      setPassword('')
    }
    else
    {
      setErr(true)
    }
    
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="row">
          <label>Username</label>
          <input type="text" placeholder="Enter your Username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div id="button" className="row">
          <button type="submit">Log In</button>
        </div>
        <div id="button" className="row">
          <button onClick={() => setToken(true)}>Sign Up</button>
          {token && navigate('/signup')}
          {err && <span style={{ color: "red" }} className="row">Username and Password cannot be empty</span>}
        </div>
        
        
        {/* <input id="button" className="row" type="submit" /> */}
      </form>
      <div id="button" className="row">
          <button onClick={() => navigate('/album')}>Album</button>
          
        </div>
      {/* <div id="button" className="row">
          <button onClick={() => setToken(true)}>Sign up</button>
      </div> */}
    </div>

  )
}

export default FormInput
