type BMI = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese';

const calculateBmi = (kg: number, cm: number): BMI => {
  const bmi: number = (cm*100)/kg;
  if(bmi < 18.5) return 'Underweight';
  if(bmi < 25) return 'Normal weight';
  if(bmi < 30) return 'Overweight';
  else return 'Obese';
};

interface TwoNums {
  kg: number
  cm: number
}

const parseArguments = (args: Array<string>): TwoNums => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      kg: Number(args[2]),
      cm: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
try {
  const { kg, cm } = parseArguments(process.argv);
  console.log(calculateBmi(kg, cm));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
}
export default calculateBmi;
