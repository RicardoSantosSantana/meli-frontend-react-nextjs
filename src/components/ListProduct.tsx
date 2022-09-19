import { AspectRatio, Box, Center, Container, Flex, HStack, Spacer, Text, Wrap } from "@chakra-ui/react";
import { NextPage } from "next";
import { Product } from '../types/product'
import Items from './Items'

interface Props {
  products: Product[]
}

const ListProduct: NextPage<Props> = ({ products }) => {

  return (
    <>
      {products.length > 0 ?
        (
          <Wrap spacing='14px'>
            { products.map((prod, index) => <Items key={"items_" + index + prod.id} product={prod} />) }
          </Wrap>
        ) : (
          <Wrap spacing='14px'>
            <Text>Nenhum produto cadastrado</Text>
          </Wrap>
        )
      }
    </>
  );
}
export default ListProduct

