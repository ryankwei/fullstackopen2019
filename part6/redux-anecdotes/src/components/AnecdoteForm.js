import React from 'react'
import { connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'
const NewAnec = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value=''
    props.createAnec(content)
    props.setNotification(`created anecdote ${content}`,5)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnec, setNotification
}
const ConnectedNewAnec = connect(null, mapDispatchToProps)(NewAnec)
export default ConnectedNewAnec
