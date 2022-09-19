import { Button, Center, Divider, FormControl, FormErrorMessage, FormLabel, Input, Stack, Textarea, useColorModeValue, useToast } from "@chakra-ui/react";

import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from '../hooks/useAuth'

import { useToastHook, statusMessage } from "../hooks/useToastHook";

export default function FormLogin() {

    const { signInEmail, user, loading, error } = useAuth()

    const [state, newToast] = useToastHook();

    const showMessage = (message, status) => {
        const params = { message: message, status: status };
        newToast(params);
    }

    useEffect(() => {
        if (user?.user) {
            showMessage("welcome " + user.user.name, statusMessage.Info)
        }
    }, [user])

    useEffect(() => {
        if (error.email) {
            showMessage(error.email, statusMessage.Warning)
        }
        if (error.code) {
            showMessage(error.code, statusMessage.Warning)
        }
    }, [error])

    function validateEmpty(value) {
        let error

        if (!value) {
            error = 'Email is required'
        }

        return error
    }

    async function actionForm(values, actions) {

        console.group("actionForm")
        console.log(JSON.stringify(values))
        console.groupEnd()

        await signInEmail(values.email, values.password);

    }

    const initialValues = {
        "email": "",
        "password": ""
    };

    return (


        <Formik initialValues={initialValues} onSubmit={actionForm}>
            {(props) => (
                <Form>

                    <Field name='email' validate={validateEmpty} >
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                <FormLabel m={0} p={1}>Email</FormLabel>
                                <Input {...field} maxLength={60} placeholder='email' />
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name='password' validate={validateEmpty} >
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                <FormLabel m={0} p={1}>Password</FormLabel>
                                <Input type="password" {...field} maxLength={60} placeholder='password' />
                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>


                    <Divider />

                    <Button mt={4} borderWidth="1px" rounded="lg" w="full" shadow="lg" isLoading={loading} type='submit' >
                        Acessar
                    </Button>


                </Form>
            )}
        </Formik>

    )
}