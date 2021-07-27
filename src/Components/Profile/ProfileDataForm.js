import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../App/FormFields/Input';
import { Select } from '../App/FormFields/Select';
import { TextArea } from '../App/FormFields/TextArea';
import { requiredField, maxLength } from '../App/Helpers/Validators';

const maxLenght100 = maxLength(100);

const ProfileDataForm = ({ setEditProfileDataMode, handleSubmit, error}) => {
    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Field component={Input} validate={[requiredField]} name='fullName' label="Full name" placeholder="Enter new name" type="text" />
            <Field component={Select} validate={[requiredField]} name="lookingForAJob" label="Looking for a job"  options={[{value: true, option: 'yes'},{value: false, option: 'no'}]} />
            <Field validate={[requiredField, maxLenght100]} className="form-control" name='lookingForAJobDescription' label="Job description" component={TextArea} />
            <Field validate={[requiredField, maxLenght100]} className="form-control" name='aboutMe' label="About Me" component={TextArea} />
            <Button variant="primary" type="submit">Save</Button>
            <Button className="ml-1" variant="danger" type="button" onClick={()=>setEditProfileDataMode(false)}>Cancel</Button>
        </Form>
    )
}

export default reduxForm({form: 'updateProfile'})(ProfileDataForm);