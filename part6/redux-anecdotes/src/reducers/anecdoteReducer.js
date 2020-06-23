import anecdoteService from '../services/anecdotes'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const anecToChange = state.find(n => n.id === action.data.id)
      const newAnec = {
        ...anecToChange,
        votes: anecToChange.votes + 1
      }
      return state.map(anec => anec.id !== action.data.id ? anec : newAnec).sort((a, b) => b.votes - a.votes)
    case 'NEW_ANEC':
      return [...state, action.data].sort((a, b) => b.votes - a.votes)
    case 'INIT_ANEC':
      return action.data
    default:
    return state.sort((a, b) => b.votes - a.votes)
  }
}
export const createAnec = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANEC',
      data: newAnec
    })
  }
}
export const vote = (id) => {
  return async dispatch => {
    await anecdoteService.updateVote(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes,
    })
  }
}
export default reducer
