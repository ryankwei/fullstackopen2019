import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course.name}</h1>
)

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Content = (props) => (
  <>
    {props.parts.map((part,index) => <Part part={part.name} exercises={part.exercises} key={index}/>)}
  </>
)

const Total = (props) => {
  /*let count=0
  for(let part in props.parts) {
    count+= props.parts[part].exercises
  }*/
  const total = props.parts.reduce((s,p) => (s + p.exercises), 0)
  return (
    <p>total of {total} exercises</p>
  )
}

const Course = (props) => {
  return (
    <>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
}

export default Course
