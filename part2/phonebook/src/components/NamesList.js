import React from 'react'

const NamesList = (props) => {
  let returnArray = []
  if(props.filter !== '')
    returnArray=props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
  else
    returnArray = props.persons
  return returnArray.map((person, i) => (
    <div key={i}>
      <p>{person.name} {person.number}</p>
      <button onClick={props.deletePerson(person.id)}>delete</button>
    </div>
    ))
}

export default NamesList
