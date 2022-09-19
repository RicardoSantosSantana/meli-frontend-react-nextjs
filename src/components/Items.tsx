import React from 'react';
import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  WrapItem,
  Center,
  Heading,
  Text,
  Divider,
  Wrap,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { NextPage } from "next";

import { FiShoppingCart } from 'react-icons/fi';
import Slide from './Slide';
import { Description, Sizes, Picture, Product } from '../types/product'
import Link from 'next/link';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import DetailProduct from './DetailsProduct';
import ModalFull from './ModalFull';
import { Router, useRouter } from 'next/router';

interface Props {
  product: Product
}

const Items: NextPage<Props> = ({ product }) => {
  
  const router = useRouter();
  const pictures: Picture[] = product.pictures
   
  const openDetail = () => {    
    router.push(`/dashboard/${product.id}`);
  }

  return (
  
    <>

      <WrapItem key={"item_" + product.id} rounded="lg" >
        <Center >
          <Box bg={useColorModeValue('white', 'gray.900')} maxW="sm" p={2} borderWidth="1px" rounded="lg" shadow="lg" position="relative">
            <Slide key={"slide_" + product.id} pictures={pictures} />

            <Divider></Divider>
            <Box p="6">

              <Box alignItems="baseline">
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="orange">
                  {product.condition}
                </Badge>
              </Box>

              <Flex alignContent="center">
                <Box color={useColorModeValue('gray.700', 'gray.100')} fontSize="xl" fontWeight="semibold" as="h6" lineHeight="tight">
                  <Wrap p={3} m={1}>
                    {product.title}
                  </Wrap>
                </Box>
              </Flex>

              <Flex justifyContent="right" alignContent="right">
                <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                  <Button onClick={() => openDetail()} rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='link'>   Detalhes
                  </Button>
                </Box>
              </Flex>

            </Box>
          </Box>
        </Center>
      </WrapItem>
      </>
 
  );
}

export default Items;