import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Center,
    Divider,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaEnvelope, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../hooks/useAuth'
 

export default function Login() {
    
const { signInGoogle, signInGithub, loading } = useAuth()

const [showFormRegister, setShowFormRegister] = useState(true);

    return (

        <Stack spacing={4} w={'full'} maxW={'md'}>
                     
            <Text>Entrar com</Text>
            
            <Button w="full" onClick={signInGoogle} mr={2} size={'lg'}  colorScheme={'google'} variant={'outline'} leftIcon={<FcGoogle />}>
                <Text>Google</Text>
            </Button>

            <Button w="full"  size={'lg'} onClick={signInGithub} colorScheme={'linkedin'} leftIcon={<FaGithub />}>
                <Text>Github</Text>
            </Button> 
           
        </Stack>

    );
}
