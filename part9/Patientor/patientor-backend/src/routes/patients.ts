import express from 'express';
import patientsService from '../services/patientsService'
import { toNewPatientData, toNewEntry } from '../utils'
//import patients from '../../data/patients';
const router = express.Router();

router.get('/', (_req, res) => {
  return res.send(patientsService.getData());
});

router.get('/:id', (req, res) => {
  const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };
  if(!isString(req.params.id)) {
    return res.sendStatus(404)
  }
  const patient = patientsService.findById(String(req.params.id))
  console.log(patient)
  if(patient) {
    return res.send(patient)
  } else {
    return res.sendStatus(404)
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const newlyCreatedEntry = patientsService.addEntry(req.params.id, newEntry);
    return res.json(newlyCreatedEntry);
  } catch(e) {
    console.log(e.message)
    return res.status(400).send(e.message)
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientData = toNewPatientData(req.body);
    const newPatient = patientsService.addData(newPatientData);
    return res.json(newPatient)
  } catch(e) {
    console.log(e.message)
    return res.status(400).send(e.mssage)
  }
});

export default router;
