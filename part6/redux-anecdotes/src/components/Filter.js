import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    event.preventDefault()
    const filter = event.target.value
    props.setFilter(filter)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
const mapDispatchToProps = {
  setFilter
}
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
