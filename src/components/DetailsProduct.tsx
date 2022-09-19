import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,

    List,
    ListItem,
    Divider,
    Badge,
} from '@chakra-ui/react';
import date from 'date-and-time';

import { NextPage } from 'next';

import { MdLocalShipping } from 'react-icons/md';
import { Picture, Product } from '../types/product';
import Slide from './Slide';

import { SalesTerms } from '../types/product'

interface Props {
    product: Product
}

const DetailsProduct: NextPage<Props> = ({ product }) => {

    const description = JSON.parse(String(product.description))
    const pictures: Picture[] = product.pictures
    const sales_terms = JSON.parse(String(product.sale_terms))
 
    const openStore = () => window.open(product.permalink, "_blank");
    
    const listWarranty = () => {
        return sales_terms.map((warranty:SalesTerms, index:number) => {
            return (
                <List spacing={2} key={warranty.id + index + warranty.value_id}>
                    <ListItem style={{ fontWeight: 'bold' }}>{warranty.id.replace("WARRANTY_", "")}</ListItem>
                    <ListItem>{warranty.name}</ListItem>{' '}
                    <ListItem>{warranty.value_name}</ListItem>
                </List>
            )
        })
    }

    return (
        <Container maxW={'7xl'}>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 24 }}>

                <Stack spacing={{ base: 6, md: 10 }}    divider={
                        <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
                        }>
                    <Flex>
                        <Slide key={"slide_" + product.id} pictures={pictures} />
                    </Flex>
               
                    <Box>
                        <Text
                            fontSize={{ base: '16px', lg: '18px' }}
                            color={useColorModeValue('yellow.500', 'yellow.300')}
                            fontWeight={'500'}
                            textTransform={'uppercase'}
                            mb={'4'}>
                            Warranty
                        </Text>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                            { listWarranty() }
                        </SimpleGrid>
                    </Box>
                </Stack>

                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                            {product.title}
                            
                        </Heading>
                        <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="gray">
                                {product.id}
                            </Badge>
                        <Text mt={5}
                            color={useColorModeValue('gray.900', 'gray.400')}
                            fontWeight={300}
                            fontSize={'2xl'}>
                            {product.currency_id} {product.price}
                        </Text>
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                        <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
                        }>
                        <VStack spacing={{ base: 4, sm: 6 }}>
                            <Text
                                textAlign={'justify'}
                                color={useColorModeValue('gray.500', 'gray.400')}
                                fontSize={'2xl'}
                                fontWeight={'300'}>
                                {description.plain_text}
                            </Text>

                        </VStack>

                        <Box>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                color={useColorModeValue('yellow.500', 'yellow.300')}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                Product Details
                            </Text>

                            <List spacing={2}>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Condition - Status:
                                    </Text>{' '}
                                    {product.condition} - {product.status}
                                </ListItem>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Available Quantity:
                                    </Text>{' '}
                                    {product.available_quantity}
                                </ListItem>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Sold Quantity:
                                    </Text>{' '}
                                    {product.sold_quantity}
                                </ListItem>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Initial Quantity:
                                    </Text>{' '}
                                    {product.initial_quantity}
                                </ListItem>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Category Id:
                                    </Text>{' '}
                                    {product.category_id}
                                </ListItem>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Health:
                                    </Text>{' '}
                                    {product.health}
                                </ListItem>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Buying Mode:
                                    </Text>{' '}
                                    {product.buying_mode}
                                </ListItem>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Warranty:
                                    </Text>{' '}
                                    {product.warranty}
                                </ListItem>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Listing Type Id:
                                    </Text>{' '}
                                    {product.listing_type_id}
                                </ListItem>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Start Time:
                                    </Text>{' '}
                                    {date.format(new Date(product.start_time), 'DD/MM/YYYY HH:mm:ss')}
                                </ListItem>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Stop Time:
                                    </Text>{' '}
                                    {date.format(new Date(product.stop_time), 'DD/MM/YYYY HH:mm:ss')}
                                </ListItem>
                            </List>
                        </Box>
                    </Stack>

                    <Button
                        onClick={openStore}
                        rounded={'none'}
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        py={'7'}
                        bg={useColorModeValue('gray.900', 'gray.50')}
                        color={useColorModeValue('white', 'gray.900')}
                        textTransform={'uppercase'}
                        _hover={{
                            transform: 'translateY(2px)',
                            boxShadow: 'lg',
                        }}>

                        Add to cart
                    </Button>

                    <Stack direction="row" alignItems="center" justifyContent={'center'}>
                        <MdLocalShipping />
                        <Text>2-3 business days delivery</Text>
                    </Stack>
                </Stack>
            </SimpleGrid>
        </Container>
    );
}

export default DetailsProduct