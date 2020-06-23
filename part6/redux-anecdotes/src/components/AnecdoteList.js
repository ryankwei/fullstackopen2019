import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const Anec = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}
const Anecdotes = (props) => {
  const handleVote = (anecdote) => {
    props.vote(anecdote.id)
    props.setNotification(`voted for anecdote ${anecdote.content}`, 5)
  }
  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <Anec
          anecdote={anecdote}
          handleVote={()=>handleVote(anecdote)}
        />
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  if ( state.filter === '' )
    return {
      anecdotes: state.anecdotes
    }
  else {
    return {
      anecdotes: state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    }
  }
}
const mapDispatchToProps = {
  vote, setNotification
}
const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
export default ConnectedAnecdotes
