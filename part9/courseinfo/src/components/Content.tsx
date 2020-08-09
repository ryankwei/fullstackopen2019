import React from 'react';
import { CoursePart } from '../types'
import Part from './Part'

interface CourseProps {
  parts: CoursePart[];
}

const Content: React.FC<CourseProps> = ({ parts }) => {
  return <div>{parts.map(part => <Part key={part.name} part={part} />)}</div>
}
export default Content
