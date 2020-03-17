import React, { useState, useEffect } from 'react'
import NamesList from './components/NamesList'
import Filter from './components/Filter'
import InputForm from './components/InputForm'
import ServerIO from './components/ServerIO'
import Notification from './components/Notification'
import './index.css'
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    ServerIO
      .getList()
      .then(returnedObj => {
        setPersons(returnedObj)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if(persons.some(e => e.name === newName)) {
      const confirmChange = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(confirmChange) {
        const id = persons.filter(person => person.name === newName)[0].id
        const newObj = { name: newName, number: newNum }
        ServerIO
          .update(id, newObj)
          .then(returnedObj => {
            setPersons(persons.map(person => (id===person.id) ? returnedObj : person))
            setNewName('')
            setNewNum('')
            setMessage(`Updated ${returnedObj.name}'s phonenumber`)
            setTimeout(() => { setMessage(null) }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              error.response.data
            )
            setTimeout(()=> {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNum('')
            ServerIO
              .getList()
              .then(returnedObj => setPersons(returnedObj))
          })
      }
    }
    else {
      ServerIO
        .create({ name: newName, number: newNum })
        .then(returnedObj => {
          setPersons(persons.concat(returnedObj))
          setNewName('')
          setNewNum('')
          setMessage(`Added ${returnedObj.name}`)
          setTimeout(() => { setMessage(null) }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            error.response.data
          )
          setTimeout(()=> {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNum('')
        })
    }
  }

  const handleDelete = (id) => () => {
    const person = persons.filter(person => person.id === id)[0]
    console.log(person)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)
    if(confirmDelete) {
      ServerIO
        .deletePerson(id)
        .then(returnedObj => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const filterChange = (event) => setNewFilter(event.target.value)

  const handleNewName = (event) => setNewName(event.target.value)

  const handleNewNum = (event) => setNewNum(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        isError={false}
      />
      <Notification
        message={errorMessage}
        isError={true}
      />
      <Filter
        filterBy={newFilter}
        filterChange={filterChange}
      />
      <InputForm
        addName={addName}
        newName={newName}
        handleNewName={handleNewName}
        newNum={newNum}
        handleNewNum={handleNewNum}
      />
      <h2>Numbers</h2>
      <NamesList
        persons={persons}
        filter={newFilter}
        deletePerson={handleDelete}
      />
    </div>
  )
}

export default App
