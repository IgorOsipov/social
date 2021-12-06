import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FilterType } from '../../Redux/usersReducer';



type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = (props) => {
    const usersSearchFormValidate = (values: ValuesType) => {
        const errors = {};
        return errors;
    }

    type ValuesType = {
        term: string
        friend: 'null' | 'true' | 'false'
    }

    const submit = (values: ValuesType,  { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter);
        setSubmitting(false);
    }

    return (
        <Formik
            initialValues={{ term: '', friend: "null"}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value='null' >All</option>
                        <option value='true'>Followed only</option>
                        <option value='false'>Unfollowed only</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default UsersSearchForm;