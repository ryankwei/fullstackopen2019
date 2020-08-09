/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, Discharge, HealthCheckRating, NewPatientData, SickLeave, NewBaseEntry, NewEntry, DiagnosisData } from '../types'
import diagnosesService from './services/diagnosesService';
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
}
const diag = diagnosesService.getData().map(d => d.code);
const parseStringValue = (value: any, label: string): string => {
  if(!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${label}: ` + value);
  }

  return value
}

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}

const parseGenderValue = (gender: any): Gender => {
  if(!gender || !isGender(gender))
    throw new Error('Incorrect or missing gender: ' + gender)
  return gender
}
const parseDateValue = (date: any): string => {
  if(!date || !isString(date) || !isDate(date))
    throw new Error('Incorrect or missing date: ' + date)
  return date
}

const isDischarge = (param: any): param is Discharge => {
  return (typeof param.date === 'string' || param.date instanceof String) && (typeof param.criteria === 'string' || param.criteria instanceof String);
}

const parseDischarge = (discharge: any): Discharge => {
  if(!discharge || !isDischarge(discharge))
    throw new Error('Incorrect or missing discharge: ' + discharge)
  return discharge
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
}

const parseHealthCheckRating = (hc: any): HealthCheckRating => {
  if(!hc || !isHealthCheckRating(hc))
    throw new Error('Incorrect or missing HealthCareRating: ' + hc)
  return hc;
}

export const toNewPatientData = (object: any): NewPatientData => {
    const newEntry: NewPatientData = {
      name: parseStringValue(object.name, 'name'),
      dateOfBirth: parseDateValue(object.dateOfBirth),
      ssn: parseStringValue(object.ssn, 'ssn'),
      gender: parseGenderValue(object.gender),
      occupation: parseStringValue(object.occupation, 'occupation'),
      entries: []
    }

    return newEntry
}

const assertNever = (value: never): never => {
  throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isEntryType = (param: any): param is "HealthCheck" | "OccupationalHealthcare" | "Hospital"  => {
  return isString(param) && (param === 'HealthCheck' || param === 'OccupationalHealthcare' || param === 'Hospital');
}

const isSickLeave = (param: any): param is SickLeave => {
  return (param.startDate && isDate(param.startDate)) && (param.endDate && isDate(param.endDate))
}

const parseSickLeave = (sickleave: any): SickLeave => {
  if(!sickleave || !isSickLeave(sickleave))
    throw new Error('Incorrect or missing Sickleave' + sickleave) 
  return sickleave
}

const parseEntryType = (type: any): "HealthCheck" | "OccupationalHealthcare" | "Hospital" => {
  if(!type || !isEntryType(type))
    throw new Error('Incorrect or missing type: ' + type)
  return type
}

const isDiagnosisCodes = (param: any): param is Array<DiagnosisData['code']> => {
  if(!Array.isArray(param)) return false;
  for( let v of param) {
    if(!diag.includes(v)) return false;
  }
  return true;
}

const parseDiagnosisCodes = (codes: any): Array<DiagnosisData['code']> => {
  if(!codes) return [] as Array<DiagnosisData['code']>;
  else {
    if(isDiagnosisCodes(codes)) return codes;
    else 
      throw new Error('Invalid codes, ' + codes)
  }

}

const newBaseEntry = (object: any): NewBaseEntry => {
  const newEntry: NewBaseEntry = {
    description: parseStringValue(object.description, 'description'),
    date: parseDateValue(object.date),
    specialist: parseStringValue(object.specialist, 'specialist'),
    type: parseEntryType(object.type),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  }

  return newEntry;
}

export const toNewEntry = (object: any): NewEntry => {
  let out = newBaseEntry(object) as NewEntry;

  switch (out.type) {
    case "Hospital":
      return {
        ...out,
        discharge: parseDischarge(object.discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...out,
        employerName: parseStringValue(object.employerName, 'employer name'),
        sickLeave: object.sickLeave ? parseSickLeave(object.sickLeave) : undefined
      }
    case "HealthCheck":
      return {
        ...out,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      }
    default:
      return assertNever(out);
  }
}