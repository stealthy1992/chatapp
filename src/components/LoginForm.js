import React from 'react'
import FormHeader from './FormHeader'
import Form from './Form'
import OtherMethods from './OtherMethods'
import Signup from './Signup'




const LoginForm = ({title, addUser}) => {
  
  return (
    <div id="loginform">
        <FormHeader pageTitle={title} />
        <Form retrieveUser={addUser} />
        {/* <Signup /> */}
        <OtherMethods />
    </div>
  )
}

export default LoginForm
