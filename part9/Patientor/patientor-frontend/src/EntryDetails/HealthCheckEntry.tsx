import React from "react";
import { HealthCheckEntry } from '../types';
import { Icon } from "semantic-ui-react";

const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <div>
            <strong>{entry.healthCheckRating}</strong><Icon name='heart' />
        </div>
    )
}

export default HealthCheckEntryComponent;