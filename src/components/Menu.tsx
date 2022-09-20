import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Box, Flex, Avatar, HStack, Link, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, useColorMode, Container, Wrap, Center } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SmallAddIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NextPage } from 'next';
import { Profile, Sizes } from '../types/product';
import ModalFull from './ModalFull';
const Links = ['Dashboard', 'Projects', 'Team'];

import NewProduct from './product/New'

interface NavProps {
  link: any;
  children: any;
}

const NavLink: NextPage<NavProps> = (Props: NavProps) => {

  return (
    <Link href={Props.link} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }}  >
      {Props.children}
    </Link>
  );

}

interface Props {
  profile: Profile
}


const Menutop: NextPage<Props> = ({ profile }) => {

  const { logOut, isOpenModal, setIsOpenModal } = useContext(AuthContext)

  const { isOpen, onOpen, onClose } = useDisclosure();

  //const [isOpenModal, setIsOpenModal] = useState(false)

  const { colorMode, toggleColorMode } = useColorMode();
  const onOpenModal = () => setIsOpenModal(true);
  const closeOpenModal = () => setIsOpenModal(false);

  return (
    <>
      <ModalFull isOpen={isOpenModal} size={Sizes.Large} onClose={closeOpenModal} onOpen={onOpenModal}>
        <NewProduct />
      </ModalFull>
      <Box pl={2} pr={2} bg={useColorModeValue('gray.200', 'gray.900')} color={useColorModeValue('gray.700', 'gray.100')}  >

        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            bg={useColorModeValue('gray.200', 'gray.900')}
            size={'lg'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={'center'}>

            <Button onClick={onOpenModal} colorScheme={'telegram'} >new product </Button>
            <Box>Logo</Box>

            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>

              <NavLink link={'/'}>Home</NavLink>
              <NavLink link={'/dashboard'}>Dashboard</NavLink>

            </HStack>

          </HStack>

          <Flex alignItems={'center'} >


            <Button onClick={toggleColorMode} bg={useColorModeValue('gray.200', 'gray.900')} >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <img style={{ width: "40px", height: "40px" }} className="chakra-avatar__img css-3a5bz2" referrerPolicy="no-referrer" src={profile.avatar_url} />
              </MenuButton>
              <MenuList alignItems={'center'} m={2} >

                <Center>
                  <Avatar size={'2xl'} src={profile.avatar_url} />
                </Center>

                <Center>{profile.name}</Center>
                <Center><small>{profile.email}</small></Center>

                <MenuDivider />
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} link={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default Menutop