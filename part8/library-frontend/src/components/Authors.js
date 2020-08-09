import { UPDATE_BORN, ALL_AUTHORS } from '../queries'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
const Authors = (props) => {
  const [born, setBorn] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [ updateBorn ] = useMutation(UPDATE_BORN,  {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const newBorn = async (event) => {
    event.preventDefault()

    updateBorn({
      variables: { name: selectedName, born: parseInt(born) }
    })

    setSelectedName('')
    setBorn('')
  }

  const res = useQuery(ALL_AUTHORS)
  if(res.loading) {
    return (
      <div>loading...</div>
    )
  }
  const authors = res.data.allAuthors
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={newBorn}>
        <select value={selectedName} onChange={({ target }) => setSelectedName(target.value)}>
        {authors.map(a => <option value={a.name} key={a.id}>{a.name}</option>)}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit" onSubmit={newBorn}>update author</button>
      </form>
    </div>
  )
}

export default Authors
