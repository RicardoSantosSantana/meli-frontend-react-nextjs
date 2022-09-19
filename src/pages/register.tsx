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