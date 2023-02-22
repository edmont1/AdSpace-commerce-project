import * as yup from "yup"

export interface FormValues {
  [index: string]: any
  title: string,
  category: string,
  files: any[],
  description: string,
  price: string,
  name: string,
  email: string,
  tel: string
  id: string
  cep: string
  rua: string
  bairro: string,
  cidade: string,
  estado: string
}

const initialValues: FormValues = {
  title: "",
  category: "",
  files: [],
  description: "",
  price: "",
  name: "",
  email: "",
  tel: "",
  id: "",
  cep: "",
  rua: "",
  bairro:"",
  cidade: "",
  estado: ""
}

const validationSchema = yup.object().shape({
  title: yup.string()
    .required("Campo obrigatório"),
  category: yup.string()
    .required("Campo obrigatório"),
  description: yup.string()
    .required("Campo obrigatório"),
  price: yup.number()
    .typeError("Digite apenas números")
    .positive("Digite apenas números positivos")
    .required("Campo obrigatório"),
  name: yup.string()
    .required("Campo obrigatório"),
  email: yup.string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  tel: yup.number()
    .typeError("Digite apenas números")
    .required("Campo obrigatório"),
  files: yup.array()
    .min(1, "Selecione pelo menos uma foto")
    .required("Campo obrigatório"),
  cep: yup.string()
    .matches(/^[0-9]{8}$/, "Cep Invalido"),
  rua: yup.string(),
  bairro: yup.string(),
  cidade: yup.string()
    .required("Campo obrigatório"),
  estado: yup.string()
    .required("Campo obrigatório")

})

export {
  initialValues,
  validationSchema
}