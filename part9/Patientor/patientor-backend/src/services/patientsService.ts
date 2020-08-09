import patients from '../../data/patients';
import { PatientData, PatientDataNoSSN, NewPatientData, Entry, NewEntry } from '../../types';
import { v4 as uuid } from 'uuid';
const getData = (): Array<PatientData> => {
  return patients;
};
const addData = (entry: NewPatientData): PatientData => {
  const newPatientData = {
    id: String(Math.random() % 1000),
    ...entry
  }

  patients.push(newPatientData);

  return newPatientData;
};
const getNoSSNData = (): PatientDataNoSSN [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({ id, name, dateOfBirth, gender, occupation, entries }))
};
const findById = (id: string): PatientData | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
}

const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient = patients.find(p => p.id === id);
  if(!patient) {
    throw new Error('invalid id');
  }
  else {
    const fullEntry: Entry = {
      ...entry,
      id: uuid()
    };
    patient.entries = patient.entries.concat(fullEntry);
    return fullEntry;
  }
}

export default {
  getData,
  addData,
  getNoSSNData,
  findById,
  addEntry
}
