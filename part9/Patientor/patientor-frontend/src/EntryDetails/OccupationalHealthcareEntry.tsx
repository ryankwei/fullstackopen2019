import React from "react";
import { OccupationalHealthcareEntry } from '../types';
import { Icon } from "semantic-ui-react";

const OccupationalHealthcareEntryComponent: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
        <div>
            <strong>{entry.employerName}</strong><Icon name='hospital outline' />
            {entry.sickLeave ? <p>{entry.sickLeave.startDate} {entry.sickLeave.endDate}</p> : null}
        </div>
    )
}

export default OccupationalHealthcareEntryComponent;