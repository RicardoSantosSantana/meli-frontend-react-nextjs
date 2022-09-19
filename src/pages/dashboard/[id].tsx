import { Divider, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import { NextPage } from "next";
import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react";
import DetailsProduct from "../../components/DetailsProduct";
import Menutop from "../../components/Menu";
import { EndPoints } from "../../config/api";
import { api } from "../../services/api";
import apiServerSide from "../../services/serverSide";
import { Profile } from "../../types/product";

interface Props {
  profile: Profile,

}

const productID: NextPage<Props> = ({ profile }) => {

  const [product, setProduct] = useState();

  const router = useRouter();

  const id_product = router.query.id;
 
  const getProduct = async (id: string) => {

    const product = await api.get(`${EndPoints.GetProductsByID}/${id}`).then(resp => {

      if (resp.status == 200) {     
        setProduct(resp.data)
      }

      if (resp.hasOwnProperty('response')) {
        return resp.response.data
      }

    }).catch((error) => {
      console.log(error);
    })

  }
  useEffect(() => {
    if (id_product) {
      getProduct(id_product)
    }

  }, [id_product])

  return (

    <Grid
      templateAreas={`"header" "main" "footer"`}
      gridTemplateRows={'1fr 100%'}
      gridTemplateColumns={'100% 1fr'}
      h='100%'
      gap='1'

      fontWeight='bold'
    >
      <GridItem pb='15' area={'header'}>
        <Menutop profile={profile} />
        <Divider bg={useColorModeValue('green.900', 'gray.800')} />
      </GridItem>

      <GridItem m={15} area={'main'}>
        {product ? <DetailsProduct product={product} /> : <h1>product {id_product} not found</h1>}
      </GridItem>

      <GridItem p='3' bg='gray.700' color='gray.600' area={'footer'}>
        Developed by Ricardo
      </GridItem>

    </Grid>

  )
}

export default productID

export async function getServerSideProps(ctx: any) {
  
  const profile: Profile = await apiServerSide(ctx)

  return {
    props: { profile }
  }

}
