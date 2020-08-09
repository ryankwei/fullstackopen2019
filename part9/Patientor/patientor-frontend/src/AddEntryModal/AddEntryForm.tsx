import React, { useState } from 'react';
import { Dropdown, Form, DropdownProps, Divider } from "semantic-ui-react";
import { EntryFormValues } from '../types'; 
import EntryTypeForm from "./EntryTypeForm";

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [entryType, setEntryType] = useState<"HealthCheck" | "OccupationalHealthcare" | "Hospital" | undefined>(undefined);
    const typeOptions = [
        {
            key: "Hospital",
            text: "Hospital Entry",
            value: "Hospital"
        },
        {
            key: "OccupationalHealthcare",
            text: "OccupationalHealthcare Entry",
            value: "OccupationalHealthcare",
        },
        {
            key: "HealthCheck",
            text: "HealthCheck Entry",
            value: "HealthCheck"
        }
    ];
    
    const onChange = (
        _event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
      ) => {
        if(data.value) setEntryType(data.value as "HealthCheck" | "OccupationalHealthcare" | "Hospital")
    };

    // const entryForm = useCallback(() => {

    //     const baseInitialValues = {
    //         description: "",
    //         date: "",
    //         specialist: "",
    //     };
        
    //     const hospitalInitialValues: EntryFormValues = {
    //         ...baseInitialValues,
    //         discharge: {
    //             date: '',
    //             criteria: ''
    //         },
    //         type: "Hospital"
    //     };
    
    //     const occupationalInitialValues: EntryFormValues = {
    //         ...baseInitialValues,
    //         employerName: '',
    //         sickLeave: {
    //             startDate: '',
    //             endDate: ''
    //         },
    //         type: "OccupationalHealthcare"
    //     };
    
    //     const healthCheckInitialValues: EntryFormValues = {
    //         ...baseInitialValues,
    //         healthCheckRating: 0,
    //         type: "HealthCheck"
    //     };
    
    //     const baseValidation = (values: EntryFormValues): { [field: string]: string } => {
    //         const requiredError = "Field is required";
    //         const errors: { [field: string]: string } = {};
    //         if (!values.description) {
    //           errors.description = requiredError;
    //         }
    //         if (!values.date) {
    //           errors.date = requiredError;
    //         }
    //         if (!values.specialist) {
    //           errors.specialist = requiredError;
    //         }
    //         // if (!values.diagnosisCodes) {
    //         //   errors.diagnosisCodes = requiredError;
    //         // }
    //         return errors;
    //     };
    
    //     const occupationalValidation = (values: EntryFormValues): { [field: string]: string } => {
    //         const requiredError = "Field is required"
    //         let errors = baseValidation(values);
    //         if(values.type === "OccupationalHealthcare") {
    //             if(!values.employerName) 
    //                 errors.employerName = requiredError;
    //             if(!values.sickLeave || !values.sickLeave.startDate || !values.sickLeave.endDate)
    //                 errors.sickLeave = requiredError;
    //         }
    //         return errors;
    //     };
    
    //     const healthCheckValidation = (values: EntryFormValues): { [field: string]: string } => {
    //         const requiredError = "Field is required"
    //         let errors = baseValidation(values);
    //         if(values.type === "HealthCheck")
    //             if(!values.healthCheckRating) 
    //                 errors.healthCheckRating = requiredError;
    //         return errors;
    //     };
    
    //     const hospitalValidation = (values: EntryFormValues): { [field: string]: string } => {
    //         const requiredError = "Field is required"
    //         let errors = baseValidation(values);
    //         if(values.type === "Hospital")
    //             if(!values.discharge || !values.discharge.date || !values.discharge.criteria) 
    //                 errors.discharge = requiredError;
    //         return errors;
    //     };
    //     console.log("called on ", entryType);
    //     if(!entryType) return null;
    //     switch(entryType) {
    //         case "Hospital":
    //             return <EntryTypeForm
    //                 onSubmit={onSubmit}
    //                 onCancel={onCancel}
    //                 initialValues={hospitalInitialValues}
    //                 validation={hospitalValidation}
    //             />;
    //         case "OccupationalHealthcare":
    //             return <EntryTypeForm
    //                 onSubmit={onSubmit}
    //                 onCancel={onCancel}
    //                 initialValues={occupationalInitialValues}
    //                 validation={occupationalValidation}
    //             />
    //         case "HealthCheck":
    //             console.log("Reached");
    //             return <EntryTypeForm
    //                 onSubmit={onSubmit}
    //                 onCancel={onCancel}
    //                 initialValues={healthCheckInitialValues}
    //                 validation={healthCheckValidation}
    //             />
    //         default:
    //             console.log("error, ", entryType)
    //             return null;
    //     }
    // }, [entryType, onCancel, onSubmit]);
    const entryForm = () => {

        const baseInitialValues = {
            description: "",
            date: "",
            specialist: "",
        };
        
        const hospitalInitialValues: EntryFormValues = {
            ...baseInitialValues,
            discharge: {
                date: '',
                criteria: ''
            },
            type: "Hospital"
        };
    
        const occupationalInitialValues: EntryFormValues = {
            ...baseInitialValues,
            employerName: '',
            sickLeave: {
                startDate: '',
                endDate: ''
            },
            type: "OccupationalHealthcare"
        };
    
        const healthCheckInitialValues: EntryFormValues = {
            ...baseInitialValues,
            healthCheckRating: 0,
            type: "HealthCheck"
        };
    
        const baseValidation = (values: EntryFormValues): { [field: string]: string } => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            // if (!values.diagnosisCodes) {
            //   errors.diagnosisCodes = requiredError;
            // }
            return errors;
        };
    
        const occupationalValidation = (values: EntryFormValues): { [field: string]: string } => {
            const requiredError = "Field is required"
            let errors = baseValidation(values);
            if(values.type === "OccupationalHealthcare") {
                if(!values.employerName) 
                    errors.employerName = requiredError;
                if(!values.sickLeave || !values.sickLeave.startDate || !values.sickLeave.endDate)
                    errors.sickLeave = requiredError;
            }
            return errors;
        };
    
        const healthCheckValidation = (values: EntryFormValues): { [field: string]: string } => {
            const requiredError = "Field is required"
            let errors = baseValidation(values);
            if(values.type === "HealthCheck")
                if(!values.healthCheckRating) 
                    errors.healthCheckRating = requiredError;
            return errors;
        };
    
        const hospitalValidation = (values: EntryFormValues): { [field: string]: string } => {
            const requiredError = "Field is required"
            let errors = baseValidation(values);
            if(values.type === "Hospital")
                if(!values.discharge || !values.discharge.date || !values.discharge.criteria) 
                    errors.discharge = requiredError;
            return errors;
        };

        if(!entryType) return null;

        switch(entryType) {
            case "Hospital":
                return <EntryTypeForm
                    key={entryType}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    initialValues={hospitalInitialValues}
                    validation={hospitalValidation}
                />;
            case "OccupationalHealthcare":
                return <EntryTypeForm
                    key={entryType}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    initialValues={occupationalInitialValues}
                    validation={occupationalValidation}
                />
            case "HealthCheck":
                return <EntryTypeForm
                    key={entryType}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    initialValues={healthCheckInitialValues}
                    validation={healthCheckValidation}
                />
            default:
                console.log("error, ", entryType)
                return null;
        }
    };
    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Entry type</label>
                    <Dropdown  
                        fluid
                        selection 
                        options={typeOptions}
                        onChange={onChange}
                        value={entryType}
                    />
                </Form.Field>
            </Form>
            <Divider />
            {entryForm()}
        </div>
    )
}
export default AddEntryForm