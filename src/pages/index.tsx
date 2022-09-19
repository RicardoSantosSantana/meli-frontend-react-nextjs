import { NextPage } from "next";
import { Divider, Flex, Heading, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import Login from '../components/Login';
import WelcomeIndex from '../components/WelcomeIndex';
import { Profile } from '../types/product';
import apiServerSide from "../services/serverSide";

interface Props {
  profile: Profile
}


const Home: NextPage<Props> = (props) => {

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  return (<>

    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>

      {isLargerThan1280 ? <WelcomeIndex /> : null}

      <Flex p={8} flex={1} align={'center'} justify={'center'}>

        <Stack spacing={4} w={'full'} maxW={'full'}>

          <Flex pb={5} flex={1} align={'center'} justify={'center'}>

            <Heading color={'gray.500'} fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>

              Links {' '}
              <Text as={'span'} color={'orange.500'}>
                Úteis
              </Text>
              <Divider />

            </Heading>
          </Flex>


          <Flex p={0} flex={1} align={'center'} justify={'center'}>
            <Login />
          </Flex>

        </Stack>
      </Flex>

    </Stack>
  </>
  );
}
export default Home

export async function getServerSideProps(ctx: any) {


  const profile: Profile = await apiServerSide(ctx)

  if (profile?.client_id) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }

  return {
    props: { profile }
  }

}

