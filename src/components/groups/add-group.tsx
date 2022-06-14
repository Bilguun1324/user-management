import { Formik, Form, Field } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_GROUP } from '../../graphql';
import { GroupSchema, WarningBox, GROUP_FORM } from '../common';

type InputType = {
    field: {
        name: 'name' | 'description'
    }
    form: any
}

export const AddGroupModal = ({ setOpen }: any) => {
    const [addGroup] = useMutation(ADD_GROUP)

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
                <Box sx={{ width: 150 }}>{GROUP_FORM[name].name}:</Box>
                <TextField {...field} size='small' placeholder={GROUP_FORM[name].placeholder} />
                {errors[name] && <WarningBox>{errors[name]}</WarningBox>}
            </Box>
        )
    }



    return (
        <Formik
            initialValues={{
                name: '',
                description: ''
            }}
            validationSchema={GroupSchema}
            onSubmit={values => {
                addGroup({ variables: values }).then((res) => console.log(res))
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
                <Field name='name' component={Input} />
                <Field name='description' component={Input} />
                <Button type='submit' variant='outlined'>
                    Group нэмэх
                </Button>
            </Form>
        </Formik >
    )
}