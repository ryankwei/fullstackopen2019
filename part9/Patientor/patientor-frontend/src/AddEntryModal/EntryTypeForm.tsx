import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from '../state';
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { EntryFormValues } from "../types";
import EntryTypeFields from './EntryTypeFields';

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
    initialValues: EntryFormValues 
    validation: (values: EntryFormValues ) => { [field: string]: string }
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, initialValues, validation }) => {
    const [{ diagnoses }] = useStateValue()
    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={values => validation(values)}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
                return (
                <Form className="form ui">
                    <Field
                        label="Description"
                        placeholder="Description"
                        name="description"
                        component={TextField}
                    />
                    <Field
                        label="Date Of Apptmnt"
                        placeholder="YYYY-MM-DD"
                        name="date"
                        component={TextField}
                    />
                    <Field
                        label="Specialist"
                        placeholder="Specialist"
                        name="specialist"
                        component={TextField}
                    />
                    <DiagnosisSelection
                        diagnoses={Object.values(diagnoses)}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                    />
                    <EntryTypeFields type={values.type} />
                    <Grid>
                    <Grid.Column floated="left" width={5}>
                        <Button type="button" onClick={onCancel} color="red">
                        Cancel
                        </Button>
                    </Grid.Column>
                    <Grid.Column floated="right" width={5}>
                        <Button
                        type="submit"
                        floated="right"
                        color="green"
                        disabled={!dirty || !isValid}
                        >
                        Add
                        </Button>
                    </Grid.Column>
                    </Grid>
                </Form>
                );
            }}            
        </Formik>
    )
}

export default AddEntryForm;