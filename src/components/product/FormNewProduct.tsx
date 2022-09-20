import { NextPage } from "next";
import { Box, Button, ButtonGroup, Radio } from "@chakra-ui/react";
import { Formik } from "formik";
import {
    InputControl,
    NumberInputControl,
    PercentComplete,
    RadioGroupControl,
    ResetButton,
    SelectControl,
    TextareaControl
} from "formik-chakra-ui";

import { initialValues, validationSchema } from "./CommonProduct";

interface Props {
    onSubmit: (values: any, actions: any) => void;
    isLoading: boolean,
}
const FormNewProduct: NextPage<Props> = ({ onSubmit, isLoading }) => {
    return (
        <>

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
                            <Button borderWidth="1px" rounded="lg" shadow="lg" isLoading={isLoading} type='submit' >
                                Salvar
                            </Button>
                            <ResetButton>Reset</ResetButton>
                        </ButtonGroup>


                    </Box>

                )}
            </Formik>
        </>
    );
}
export default FormNewProduct;