import React, { useState } from 'react'
import { withFormik, Form, Field, useField } from 'formik'
import { Button, TextField } from '@material-ui/core'
import axios from 'axios'

import * as yup from 'yup'
import { useEffect } from 'react'

// Material UI TextField with access to Formik Field's props and methods 
const MuiFormikTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <TextField 
            {...field}
            {...props}
            label={label}
            error={meta.error && meta.touched}
            helperText={ (meta.error && meta.touched) && meta.error }
        />         
    )
}

const FormComponent = (props) => {
    const [users, setUsers] = useState([]);

    const {
        values,
        errors,
        status,
        isSubmitting
    } = props;

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    },[status])


    return (
        <Form>
            <MuiFormikTextField name='name' id='name' label='Name' />
            <MuiFormikTextField name='email' id='email' type='email' label='Email' />
            <MuiFormikTextField name='password' id='password' type='password' label='Password' />

            <label htmlFor='name'>Agree with terms of Service:</label>
            <Field type='checkbox' name='terms' id='terms' label='test' />

            <Button type='submit'>Submit</Button>

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
        name: '',
        email:  '',
        password: '',
        terms: false
    }),
    // Setup validation with YUP
    validationSchema: yup.object().shape({
        name: yup.string().min(2, 'Name needs minimum 2 characters').required('Name required'),
        email: yup.string().email().required('Email required'),
        password: yup.string().min(8, 'Password must have at least 8 characters').required('Password required'),
        terms: yup.bool().oneOf([true], 'Must agree with Terms of Service')
    }),
    // Handle submit
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