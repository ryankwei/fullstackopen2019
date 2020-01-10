import React from 'react'

const InputForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <h3>add a new</h3>
      <div>
        name: <input value={props.newName} onChange={props.handleNewName}/>
      </div>
      <div>
        number: <input value={props.newNum} onChange={props.handleNewNum}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default InputForm
