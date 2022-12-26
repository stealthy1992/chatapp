import React from 'react'
import FormInput from './FormInput'
import FormButton from './FormButton'

const Form = ({retrieveUser}) => {

  


  return (
    <div>
     <FormInput getUser={retrieveUser}/>
   </div>
  )
}

export default Form
