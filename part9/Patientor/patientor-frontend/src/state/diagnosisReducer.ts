import { State } from "./state";
import { Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_DIAGNOSIS";
      payload: Diagnosis;
    }
  | {
      type: "UPDATE_DIAGNOSIS";
      payload: Diagnosis;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_DIAGNOSIS":
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          [action.payload.code]: action.payload
        }
      };
    case "UPDATE_DIAGNOSIS":
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          [action.payload.code]: action.payload
        }
      }
    default:
      return state;
  }
};

export const updateDiagnosis = (diagnosis: Diagnosis): Action => {
  return {
      type: "UPDATE_DIAGNOSIS",
      payload: diagnosis
  }
};

export const addDiagnosis = (diagnosis: Diagnosis): Action => {
  return {
    type: "ADD_DIAGNOSIS",
    payload: diagnosis
  }
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList
  }
}