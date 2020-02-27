import React from 'react'
import { withFormik, Form, Field } from 'formik'
import { Button } from '@material-ui/core'

import * as yup from 'yup'

/*
 Name
 Email
 Password
 Terms of Service (checkbox)
 A Submit button to send our form data to the server.

*/
const FormComponent = (props) => {
    const {
        values,
        errors,
        touched
    } = props;
    return (
        <Form autoComplete='off'>
            <Field type='text' name='name' id='name' placeholder='Enter your name' />
            <Field type='email' name='email' id='email' placeholder='Enter your email' />
            <Field type='password' name='password' id='password' />
            <Field type='checkbox' name='terms' id='terms' />
            <Button type='submit'>Submit</Button>
        </Form>   
    )
}

const UserForm = withFormik({
    // Initialize "formik states"
    mapPropsToValues: (props) => ({
        name: props.name || '',
        email: props.email || '',
        password: props.password || '',
        terms: false
    }),
    validationSchema: yup.object().shape({
        name: yup.string().required('Required'),
        email: yup.string().email().required('Required'),
        password: yup.string().required()
    })
})(FormComponent)

export default UserForm;