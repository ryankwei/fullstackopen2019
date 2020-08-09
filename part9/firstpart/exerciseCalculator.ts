interface TrainingData {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const exerciseCalc = (days: Array<number>, target: number): TrainingData => {
   let trainingDays = 0;
   let totalHours = 0;
   for( const day of days ) {
     if(day != 0) trainingDays += 1;
     totalHours += day;
   }
   const average: number = totalHours / days.length;
   const success: boolean = average >= target;

   let rating = 2;
   let ratingDescription = 'good effort!';
   if(average-target < -0.5) {
    rating = 1;
    ratingDescription = 'getting there!';
   }
   else {
     if(average-target > 1.5) {
       rating = 3;
       ratingDescription = 'wow great job!';
     }
   }

   return {
     periodLength: days.length,
     trainingDays: trainingDays,
     success: success,
     rating: rating,
     ratingDescription: ratingDescription,
     target: target,
     average: average
   };
};
interface ExerciseData {
  exerciseDays: Array<number>,
  targ: number
}
export const parseArguments = (args: Array<string>, target: number): ExerciseData => {
  if(args.length <= 2) throw new Error('Not enough arguments');
  const arr: Array<number> = [];
  if(isNaN(target)) throw new Error(`Provided value ${target} is not a number`)
  for(let i=2; i<args.length; i++) {
    if(isNaN(Number(args[i]))) {
      throw new Error(`Provided value ${args[i]} were not numbers!`);
    }
    else {
      arr.push(Number(args[i]));
    }
  }
  return {
    exerciseDays: arr,
    targ: target
  }
};

try {
  console.log(exerciseCalc(parseArguments(process.argv, 2).exerciseDays, 2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
}

export default exerciseCalc;
