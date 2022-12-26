import React from 'react'
import Facebook from './Facebook'
import Twitter from './Twitter'

const OtherMethods = ({props}) => {
  return (
    <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <Facebook />
      {/* <Twitter /> */}
      {/* <Google /> */}
    </div>
  </div>
  )
}

export default OtherMethods
