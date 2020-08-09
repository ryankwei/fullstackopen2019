import React from 'react' 
import { CoursePart } from '../types' 
interface PartProps {
  part: CoursePart
}
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}
const Part: React.FC<PartProps> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <div>
                    <p>name: {part.name}</p>
                    <p>desc: {part.description}</p>
                    <p>exerciseCount: {part.exerciseCount}</p>
                </div>
            )
        case "Using props to pass data":
            return (
                <div>
                    <p>name: {part.name}</p>
                    <p>groupProjectCount: {part.groupProjectCount}</p>
                    <p>exerciseCount: {part.exerciseCount}</p>
                </div>
            )
        case "Deeper type usage":
            return (
                <div>
                    <p>name: {part.name}</p>
                    <p>desc: {part.description}</p>
                    <p>exerciseCount: {part.exerciseCount}</p>
                    <p>exerciseSubmissionLink: {part.exerciseSubmissionLink}</p>
                </div>
            )
        case "Python Fundamentals":
            return (
                <div>
                    <p>name: {part.name}</p>
                    <p>desc: {part.description}</p>
                    <p>exerciseCount: {part.exerciseCount}</p>
                    <p>homeworkCount: {part.homeworkCount}</p>
                </div>
            )
        default:
            return assertNever(part);
    }
}
export default Part