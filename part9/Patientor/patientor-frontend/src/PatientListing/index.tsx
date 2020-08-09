import React, { useState, useEffect } from "react";
import { Patient, Diagnosis, EntryFormValues, Entry } from '../types';
import { useStateValue, updatePatient, setDiagnosisList } from '../state';
import { useParams } from "react-router-dom"; 
import axios from "axios";
import { apiBaseUrl } from "../constants";
import EntryDetails from "../EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Button } from "semantic-ui-react";

const PatientListing: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient | undefined>(patients[id]);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            console.log(values);
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            const newPatient = {
                ...patients[id],
                entries: patients[id].entries.concat(newEntry)
            }
            dispatch(updatePatient(newPatient));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    }

    useEffect( () => {
        const setDiagnoses = async () => {
            try { 
                const { data: diagnosisList } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                dispatch(setDiagnosisList(diagnosisList));
            } catch (e) {
                console.error(e);
            }
        }
        const fetchPatientData = async () => {
            try {
                const { data: patientData } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(updatePatient(patientData));
            } catch (e) {
                console.error(e)
            }
        }
        if(!patients[id]) {
            fetchPatientData();
        } 
        else {
            setPatient(patients[id]);
        }
        if(Object.keys(diagnoses).length === 0) {
            setDiagnoses();
        }
    }, [dispatch, id, patients, diagnoses]);
    if(patient != null) {
        return (
            <div>
                <h1>{patient.name}</h1>
                <p>occupation: {patient.occupation}</p>
                <p>ssn: {patient.ssn}</p>
                <p>date of birth: {patient.dateOfBirth}</p>
                <p>gender: {patient.gender}</p>
                <p>entries</p>
                {patient.entries.map(entry => (
                    <div key={entry.id}>
                        <p>{entry.date} {entry.description}</p>
                        <EntryDetails entry={entry} />
                    </div>
                ))}
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button onClick={() => openModal()}>Add New Entry</Button>
            </div>
        );
    }
    else {
        return (
            <div>
                patient not found
            </div>
        )
    }
};

export default PatientListing;