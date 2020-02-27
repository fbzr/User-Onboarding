import React, { useState } from 'react'
import { withFormik, Form, Field } from 'formik'
import { Button } from '@material-ui/core'
import axios from 'axios'

import * as yup from 'yup'
import { useEffect } from 'react'

/*
 Name
 Email
 Password
 Terms of Service (checkbox)
 A Submit button to send our form data to the server.

*/
const FormComponent = (props) => {
    const [users, setUsers] = useState([]);

    console.log(props)
    const {
        values,
        errors,
        touched,
        status,
        isSubmitting
    } = props;

    console.log(props);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    },[status])


    return (
        <Form>
            <Field type='text' name='name' id='name' placeholder='Enter your name' />
            <Field type='email' name='email' id='email' placeholder='Enter your email' />
            <Field type='password' name='password' id='password' placeholder='Enter your password' />
            <Field type='checkbox' name='terms' id='terms' />
            <Button disabled={isSubmitting} type='submit'>Submit</Button>

            {/* Check if input was touched and show error message */}
            {touched.name && errors.name && (
                <p>{errors.name}</p>
            )}
            {touched.email && errors.email && (
                <p>{errors.email}</p>
            )}
            {touched.password && errors.password && (
                <p>{errors.password}</p>
            )}
            {touched.password && errors.password && (
                <p>{errors.password}</p>
            )}
            {errors.terms && (
                <p>{errors.terms}</p>
            )}

            {/* Map through users state and display infos */}
            { users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            )) }

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
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
        name: yup.string().min(2, 'Name needs minimum 2 characters').required('Name required'),
        email: yup.string().email().required('Email required'),
        password: yup.string().required('Password required'),
        terms: yup.bool().oneOf([true], 'Must agree with Terms of Service')
    }),
    handleSubmit: async (data, {resetForm, setSubmitting, setStatus}) => {
        try {
            setSubmitting(true)
            const res = await axios.post('https://reqres.in/api/users', data);
            console.log(res);
            setStatus(res.data);
            resetForm();
            setSubmitting(false);
        } catch(err) {
            console.log(err)
        }
    }
})(FormComponent)

export default UserForm;