
// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartWithDesc extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartOne extends CoursePartWithDesc {
    name: "Fundamentals";
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CoursePartWithDesc {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }
  
  interface CoursePartFour extends CoursePartWithDesc {
    name: "Python Fundamentals";
    homeworkCount: number;
  }

  export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;