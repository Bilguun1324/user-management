import { Formik, Form, Field } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../graphql';
import { UserSchema, WarningBox, USER_FORM } from '../common';

type InputType = {
    field: {
        name: 'firstName' | 'lastName' | 'email' | 'role'
    }
    form: any
}

export const AddUserModal = ({ setOpen }: any) => {
    const [addUser] = useMutation(ADD_USER)

    const Input = ({ field, form: { errors } }: InputType) => {
        let name = field.name

        return (
            <Box sx={{
                width: '95%',
                margin: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Box sx={{ width: 150 }}>{USER_FORM[name].name}:</Box>
                <TextField {...field} size='small' placeholder={USER_FORM[name].placeholder} />
                {errors[name] && <WarningBox>{errors[name]}</WarningBox>}
            </Box>
        )
    }



    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                role: '',
            }}
            validationSchema={UserSchema}
            onSubmit={values => {
                addUser({ variables: values }).then((res) => console.log(res))
                setOpen(false)
            }}
        >
            <Form style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}>
                <Field name='firstName' component={Input} />
                <Field name='lastName' component={Input} />
                <Field name='email' component={Input} />
                <Field name='role' component={Input} />
                <Button type='submit' variant='outlined'>
                    ADD USER
                </Button>
            </Form>
        </Formik >
    )
}