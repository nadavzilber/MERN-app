import React from './node_modules/react'
//import PropTypes from './node_modules/prop-types'
import './Error.css'

const Error = (props) => {
  return (
    <div className='errors'>
      <p style={props.widgetstyle}>{props.errMsg}</p>
    </div>
    )
}

export default Error

// Error.propTypes = {
//   errMsg: PropTypes.string,
//   unmountMe: PropTypes.func,
//   widgetstyle: PropTypes.object
// }
