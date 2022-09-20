import { useRouter } from 'next/router'

import { useContext, useState } from "react";

import { EndPoints } from "../../config/api";

import { api, logOut } from "../../services/api";
import { Sizes } from "../../types/product";
import Alert, { data } from "../Alert";
import AuthContext from "../../context/AuthContext";

import FormNewProduct from "./FormNewProduct";


const NewProduct = () => {

  const router = useRouter()

  const { setIsOpenModal } = useContext(AuthContext)
  const [isLoading, setIsloading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<data[]>([]);
  const [isShowError, setShowError] = useState(false)

  const onOpenModal = () => setShowError(true);
  const closeOpenModal = () => setShowError(false);


  const printErrors = (product_error: any) => {

    const Errors = Object.keys(product_error)

    const message: data[] = Errors.map((err) => {
      console.log(err)
      return { title: err, message: product_error[err][0] }
    }) ?? [];

    if (message) {
      setErrorMessage(message)
      onOpenModal()
    }

  }

  const save200 = (resp: any) => {

    console.log("entrou na funcaao save200")

    if (resp.status == 200) {
      setIsOpenModal(false);
      router.push(`/dashboard/${resp.data.id}`)
    }
  }

  const save401 = (resp: any) => {
    console.log("entrou na funcaao save401")
    const response = resp.response;
    if (response.status == 401) {
      console.log("o status é 401")
      console.log(response)
    }
  }
  const save422 = (resp: any) => {
    console.log("entrou na funcaao save422")
    const response = resp.response;
    if (response.status == 422) {
      console.log("o status é 422")
      printErrors(response.data.error);
    }
  }

  const catch401 = (errors: any) => {
    const error = errors.response;
    console.log("entrou na função catch 401")

    if (error.status == 401) {
      console.log("o status é 401")
      // logOut();
      //router.push("/");
    }
  }

  const catch422 = (errors: any) => {

    console.log("entrou na função catch 422")
    const error = errors.response;

    if (error.status == 422) {
      console.log("o status é 422")
      printErrors(error.data.error);
    }
  }

  const saveProduct = async (product: any) => {

    setIsloading(false)

    return api.post(EndPoints.CreateProductOnMeli, product)
      .then(resp => {
        save200(resp)
        if (resp.hasOwnProperty('response')) {
          save401(resp)
          save422(resp)
        }
      })
      .catch((errors) => {
        setIsloading(false)
        catch401(errors)
        catch422(errors)
      })
  }

  const onSubmit = (values: any, action: any) => {
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
      <FormNewProduct onSubmit={onSubmit} isLoading={isLoading} />
    </>
  );
};

export default NewProduct;