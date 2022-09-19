import React from 'react';
import { NextPage } from 'next';

import { Box } from '@chakra-ui/react';

import { Picture } from '../types/product'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
 

interface Props {
    pictures: any 
}

const Slide: NextPage<Props> = ({ pictures }) => {

    const images = JSON.parse(pictures)

    const isMoreThenOne = pictures.length > 1
  
    return (
     
        <Carousel         
        showArrows={isMoreThenOne}
        infiniteLoop={isMoreThenOne}
        autoPlay={isMoreThenOne}
        showThumbs={!isMoreThenOne}
         >
        {
            images.map((picture: Picture, index: number) =>  <img key={picture.id + index+"slide"} src={picture.secure_url} alt="img" /> )
        }
    </Carousel>
       
    )
}
export default Slide 