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
    Image,
    Center,
    Divider,
    Text,
    Avatar,
    AvatarBadge,
    useColorModeValue,
    IconButton,
  } from '@chakra-ui/react';
  import { FaGithub } from 'react-icons/fa';
  import { FcGoogle } from 'react-icons/fc';
  import { useMediaQuery } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons';
  
  export default function SplitScreen() {
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
    return (<>
  
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex
       p={8} flex={1} align={'center'} justify={'center'}
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
       
 
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack  spacing={6}>
        <Button colorScheme={'blue'} variant={'solid'}>
              Registrar
            </Button>
        </Stack>
      </Stack>
 
    </Flex>
        {
          isLargerThan1280 ? (
            <Flex flex={1}>
              <Image
                alt={'Login Image'}
                objectFit={'cover'}
                src={
                  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                }
              />
            </Flex>
          ) : null
        }
  
      </Stack>
    </>
    );
  }

  