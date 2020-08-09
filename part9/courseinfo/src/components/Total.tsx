import React from 'react';
import { CoursePart } from '../types'

interface TotalProps {
  courseParts: CoursePart[];
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}
export default Total
