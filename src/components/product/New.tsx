import { Box, Button, ButtonGroup, Radio, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from 'next/router'
import {
  InputControl,
  NumberInputControl,
  PercentComplete,
  RadioGroupControl,
  ResetButton,
  SelectControl,
  SubmitButton,
  TextareaControl
} from "formik-chakra-ui";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { EndPoints } from "../../config/api";

import { api, logOut } from "../../services/api";
import { Sizes } from "../../types/product";
import Alert, { data } from "../Alert";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { parseCookies } from "nookies";

const initialValues = {
  title: 'Produto de teste não comprar',
  price: 100,
  listing_type_id: 'free',
  condition: 'new',
  warranty: 'Sem garantia',
  warranty_period: 'Meses',
  warranty_quantity_time: '5',
  description: `Sim, trabalho, inclusive com pequenas reniões diarias com a equipe para falar sobre seus desafios e 
  necessidades para cumprir as atividades diarias
  afim de cumprir o prazo da sprint. ` ,
  brand: 'NEED',
  model: '2022'
};

const validationSchema = Yup.object({
  title: Yup.string().required().min(10),
  price: Yup.number().required().min(1),
  listing_type_id: Yup.string().required(),
  condition: Yup.string().required(),
  warranty: Yup.string().required(),
  warranty_period: Yup.string().required(),
  warranty_quantity_time: Yup.number().min(1).max(99),
  description: Yup.string().required().min(30),
  brand: Yup.string().required(),
  model: Yup.string().required()
});

const NewProduct = () => {
  const router = useRouter()
  const { logOut, isOpenModal, setIsOpenModal } = useContext(AuthContext)
  const [isLoading, setIsloading] = useState(false);

  const [errorMessage, setErrorMessage] = useState([])

  const [isShowError, setShowError] = useState(false)

  const onOpenModal = () => setShowError(true);
  const closeOpenModal = () => setShowError(false);


  const printErrors = (product_error) => {
    const Errors = Object.keys(product_error)
    console.group("PrintErrors")
    console.log(Errors);
    console.groupEnd();
    const message: data[] = Errors.map((err) => {
      return { title: err, message: product_error[err][0] }
    })

    if (message) {
      setErrorMessage(message)
      onOpenModal()
    }


  }

  const saveProduct = async (product: any) => {

    const cookieName = process.env.NEXT_PUBLIC_COOKIE_API_AUTH
    const token = parseCookies()[cookieName]

    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;


    return api.post(EndPoints.CreateProductOnMeli, product)
      .then(resp => {

        const response = resp.response;
        console.log(response);

        if (resp.status == 200) {

          console.log(resp);

          //  const productCreated:data[] = [
          //     { title:"Product created",message:resp.data.id },
          //     { title:"Link to Mercado Livre",message:resp.data.permalink}            
          //  ]

          //  setErrorMessage(productCreated)
          //onOpenModal()
          setIsOpenModal(false);

          router.push(`/dashboard/${resp.data.id}`)

          // return;
        }

        if (resp.hasOwnProperty('response')) {



          if (response.status == 401) {
            // logOut();
            //router.push("/");
          }

          if (response.status == 422) {
            console.log("erro 422")
            printErrors(response.data);
          }
        }


      })

      .catch((errors) => {
        const error = errors.response;
        console.log(error.status)
        setIsloading(false)
        if (error.status == 401) {
          // logOut();
          //router.push("/");
        }

        if (error.status == 422) {
          console.log("erro 422")
          printErrors(error.data.error);
        }



        console.log(error)
        console.error(error)
      })
  }

  const onSubmit = (values, action) => {
    setIsloading(true)
    const pictures = [
      { source: "https://res.cloudinary.com/rssantan/image/upload/v1662163143/camisa4_jljqa1.jpg" },
      { source: "https://res.cloudinary.com/rssantan/image/upload/v1662163143/camisa2_f2fclh.jpg" },
      { source: "https://res.cloudinary.com/rssantan/image/upload/v1662163143/camisa1_jwk4st.jpg" },
      { source: "https://res.cloudinary.com/rssantan/image/upload/v1662163144/camisa3_afacrx.jpg" },
    ]

    const defaultValues = {
      category_id: 'MLB3530',
      currency_id: 'BRL',
      available_quantity: 1,
      buying_mode: 'buy_it_now',
      pictures,
      ...values
    }
    saveProduct(defaultValues);
   

  };



  return (
    <>
      <Alert message={errorMessage} isOpen={isShowError} size={Sizes.Large} onClose={closeOpenModal} onOpen={onOpenModal} />
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit, values, errors }) => (
          <Box borderWidth="1px" rounded="lg" shadow="1px 1px 3px rgba(0,0,0,0.3)" p={6} m="5px auto" as="form" onSubmit={handleSubmit as any}>

            <InputControl name="title" label="Title" pt={2} />
            <NumberInputControl name="price" label="Price" pt={2} />
            <RadioGroupControl name="listing_type_id" label="Listing Type" pt={2} >
              <Radio value="free">Free</Radio>
              <Radio value="gold_pro">Premium</Radio>
              <Radio value="gold_special">Classic</Radio>
            </RadioGroupControl>
            <RadioGroupControl name="condition" label="Condition" pt={2} >
              <Radio value="not_specified">Not Specified</Radio>
              <Radio value="used">Used</Radio>
              <Radio value="new">New</Radio>
            </RadioGroupControl>

            <SelectControl name="warranty" label="Warranty" pt={2} selectProps={{ placeholder: "Select option" }}>
              <option value="Sem garantia">Sem garantia</option>
              <option value="Garantia do vendedor">Garantia do vendedor</option>
              <option value="Garantia de fábrica">Garantia de fábrica</option>
            </SelectControl>

            <SelectControl name="warranty_period" label="Warranty Period" pt={2} selectProps={{ placeholder: "Select option" }}>
              <option value="dias">Dias</option>
              <option value="meses">Meses</option>
              <option value="anos">Anos</option>
            </SelectControl>

            <NumberInputControl name="warranty_quantity_time" label="Warranty Quantity Time" pt={2} />
            <InputControl name="brand" label="Brand" pt={2} />
            <InputControl name="model" label="model" pt={2} />
            <TextareaControl name="description" label="Description" pt={2} />

            <PercentComplete />

            <ButtonGroup>
              <Button mt={4} borderWidth="1px" rounded="lg" shadow="lg" isLoading={isLoading} type='submit' >
                Salvar
              </Button>
              <ResetButton>Reset</ResetButton>
            </ButtonGroup>


          </Box>

        )}
      </Formik>
    </>
  );
};

export default NewProduct;
