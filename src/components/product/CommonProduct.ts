import * as Yup from "yup";

export const initialValues = {
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

export const validationSchema = Yup.object({
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

