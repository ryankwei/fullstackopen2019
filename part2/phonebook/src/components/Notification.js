import React from 'react'

const Notification = ({ message, isError }) => {
  if(message === null) {
    return null
  }
  if(isError) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else {
    return (
      <div className="message">
        {message}
      </div>
    )
  }
}

export default Notification
