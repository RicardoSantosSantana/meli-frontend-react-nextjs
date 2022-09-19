import { Button, Center, Divider, FormControl, FormErrorMessage, FormLabel, Input,  Stack, Textarea, useColorModeValue } from "@chakra-ui/react";

import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from '../hooks/useAuth'
import { useToastHook , statusMessage } from "../hooks/useToastHook";

 
export default function FormRegister() {

    const { registerInEmail, user, error, loading } = useAuth()
 
    const [state, newToast] = useToastHook();

    const showMessage = (message, status) => {
        const params = { message: message, status: status };
        newToast(params); 
    }

    useEffect(() => {        
        if (user?.user) {
            showMessage("welcome "+user.user.name,statusMessage.Info)
        }
    }, [user])

    useEffect(() => { 
        if (error.code) {
            showMessage(error.code,statusMessage.Warning)
        } 
    }, [error])

  
 
    function validateName(value) {
        let error

        if (!value) {
            error = 'Name is required'
        }    

        return error
    }

    function validateEmail(value) {
        let error

        if (!value) {
            error = 'Email is required'
        }    

        return error
    }
    function validatePassword(value) {
        let error

        if (!value) {
            error = 'Password is required'
        }    

        return error
    }
    
    async function  actionForm(values, actions) {
       
      registerInEmail(values.name, values.email,values.password);
     
    }

    const initialValues={
        "email":"",
        "password":"",
        "name":""
    };

    return (
      

        <Formik initialValues={initialValues} onSubmit={actionForm}>
            {(props) => (
                <Form>
                    <Field name='name' validate={validateName} >
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                <FormLabel m={0} p={1}>Name</FormLabel>
                                <Input {...field} maxLength={60} placeholder='name' />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name='email' validate={validateEmail} >
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                <FormLabel m={0} p={1}>Email</FormLabel>
                                <Input {...field} maxLength={60} placeholder='email' />
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name='password' validate={validatePassword} >
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                <FormLabel m={0} p={1}>Password</FormLabel>
                                <Input type="password" {...field} maxLength={60} placeholder='password' />
                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
   
                  
                    <Divider />
                    <Button mt={4} borderWidth="1px" rounded="lg" shadow="lg" isLoading={loading} type='submit' >
                        Registrar
                    </Button>
 
                </Form>
            )}
        </Formik>
     
    )
}