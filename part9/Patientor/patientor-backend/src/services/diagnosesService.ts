import diagnosesData from '../../data/diagnoses.json';
import { DiagnosisData } from '../../types';
const diagnoses: Array<DiagnosisData> = diagnosesData as Array<DiagnosisData>;
const getData = (): Array<DiagnosisData> => {
  return diagnoses;
};
const addData = () => {
  return null;
};

export default {
  getData,
  addData
}
