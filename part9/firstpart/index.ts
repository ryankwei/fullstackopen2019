import express from 'express';
import bmiCalc from './bmiCalculator';
import exerciseCalc, { parseArguments } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

/*
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
*/

interface ExerciseData {
  exerciseDays: Array<number>,
  targ: number
}

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if(!weight || !height || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(201).json({ error: 'malformed parameters '});
  }
  else {
    const bmi = bmiCalc(Number(weight), Number(height));
    res.status(200).send({
      weight: weight,
      height: height,
      bmi: bmi
    });
  }
});

app.post('/exercise', (req, res) => {
  try {
    const { daily_exercises, target } = req.body;
    const { exerciseDays, targ }: ExerciseData = parseArguments(daily_exercises, target)
    if(!daily_exercises || !target )
      res.status(201).json({ error: "parameter missing" });
    res.status(200).json(exerciseCalc(exerciseDays, targ));
  }
  catch (_e) {
    res.status(201).json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
