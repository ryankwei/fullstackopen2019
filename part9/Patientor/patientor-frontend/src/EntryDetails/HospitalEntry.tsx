import React from "react";
import { HospitalEntry } from '../types';
import { Icon } from "semantic-ui-react";

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <div>
            <strong>{entry.date}</strong><Icon name='heartbeat' />
            <p>{entry.discharge.date} {entry.discharge.criteria}</p>
        </div>
    )
}

export default HospitalEntryComponent;