import React from "react";
import { Field } from "formik";
import { TextField, NumberField } from "../AddPatientModal/FormField";
import { Header } from "semantic-ui-react";

export const EntryTypeFields: React.FC<{ type: "OccupationalHealthcare" | "Hospital" | "HealthCheck" }> = ({ type }) => {
    switch (type) {
        case "Hospital":
            return (
                <>
                    <Header size="small">Discharge</Header>
                    <Field 
                        label="Discharge date"
                        placeholder="YYYY-MM-DD"
                        name="discharge.date"
                        component={TextField}
                    />
                    <Field 
                        label="Discharge criteria"
                        placeholder=""
                        name="discharge.criteria"
                        component={TextField}
                    />
                </>
            )
        case "OccupationalHealthcare":
            return (
                <>
                    <Field 
                        label="Employer Name"
                        placeholder=""
                        name="employerName"
                        component={TextField}
                    />
                    <Header size="small">SickLeave</Header>
                    <Field 
                        label="Sick Leave Start Date"
                        placeholder="YYYY-MM-DD"
                        name="sickLeave.startDate"
                        component={TextField}
                    />
                    <Field 
                        label="Sick Leave End Date"
                        placeholder="YYYY-MM-DD"
                        name="sickLeave.endDate"
                        component={TextField}
                    />
                </>
            )
        case "HealthCheck":
            return (
                <>
                    <Field 
                        label="Health Check Rating"
                        name="healthCheckRating"
                        component={NumberField}
                        min={0}
                        max={3}
                    />
                </>
            )
        default:
            return null;
    }
}

export default EntryTypeFields;