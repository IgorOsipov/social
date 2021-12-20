import React from 'react';
import { Formik } from 'formik';
import { FilterType } from '../../Redux/usersReducer';
import { Button, Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

const FormStyle = styled.div`
    width: 80%;
    form{
        .form-group{
            padding: 0 5px 0 5px;
        }
    }
`


type PropsType = {
    onFilterChanged: (filter: FilterType) => void
    filter: FilterType
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

    const submit = (values: ValuesType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            //friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
            friend: values.friend as any
        }

        props.onFilterChanged(filter);
        setSubmitting(false);
    }

    return (
        <Formik
            initialValues={{ term: props.filter.term, friend: props.filter.friend as any }}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting, handleSubmit, handleChange, values }) => (
                <FormStyle>
                    <Form onSubmit={handleSubmit}>
                        {/* <Field type='text' name='term' />
                        <Field name="friend" as="select">
                            <option value='null' >All</option>
                            <option value='true'>Followed only</option>
                            <option value='false'>Unfollowed only</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button> */}

                        <Row>
                            <Form.Group as={Col} sm='7'>
                                <Form.Control onChange={handleChange} type='text' value={values.term} name='term' placeholder='Type to find user' />
                            </Form.Group>
                            <Form.Group as={Col} sm='3'>
                                <Form.Control as='select' name='friend' value={values.friend} onChange={handleChange}>
                                    <option value='null'>All</option>
                                    <option value='true'>Followed only</option>
                                    <option value='false'>Unfollowed only</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} sm='2'><Button disabled={isSubmitting} type="submit">Find</Button></Form.Group>
                        </Row>
                    </Form>
                </FormStyle>
            )}
        </Formik>
    )
}

export default UsersSearchForm;