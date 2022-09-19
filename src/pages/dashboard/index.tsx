import { useContext } from 'react';
import { NextPage } from "next";
import apiServerSide from '../../services/serverSide'
import apiServerSideProducts from '../../services/serverSideProducts'
import { Box, useDisclosure, useColorMode, GridItem, Grid, useColorModeValue, Divider } from '@chakra-ui/react';

import ListProduct from '../../components/ListProduct';
import AuthContext from '../../context/AuthContext';
import { Profile, Product } from '../../types/product';
import MenuTop from '../../components/Menu';

interface Props {
  profile: Profile,
  products: Product[]
}

const Dashboard: NextPage<Props> = ({ profile, products }) => {
 
  return (
    <Grid
      templateAreas={`"header" "main" "footer"`}
      gridTemplateRows={'1fr 100%'}
      gridTemplateColumns={'100% 1fr'}
      h='100%'  gap='1' fontWeight='bold'  >
      <GridItem pb='15' area={'header'}>
          <MenuTop profile={profile}/>
          <Divider bg={useColorModeValue('green.900', 'gray.800')} />
      </GridItem>

      <GridItem m={15}  area={'main'}>      
          <ListProduct products={products} />        
      </GridItem>

      <GridItem p='3' bg='gray.700'  color='gray.600' area={'footer'}>     
        Developed by Ricardo    
      </GridItem>

    </Grid>
 
  )


}

export default Dashboard


export async function getServerSideProps(ctx: any) {

  const products: any = await apiServerSideProducts(ctx)
  const profile: Profile = await apiServerSide(ctx)

  if (products.redirect) {
    return products
  }

  return {
    props: { profile, products }
  }

}

