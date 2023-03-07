import * as yup from "yup"

export interface FormValues {
  [index: string]: any
  title: string
  category: string
  files: any[]
  description: string
  price: string
  name: string
  email: string
  tel: string
  id: string
  image: string
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
  image: ""
}

const validationSchema = yup.object().shape({
  title: yup.string()
    .required("Campo obrigatório")
    .max(250, "O Titulo deve conter até 250 caracteres"),
  category: yup.string()
    .required("Campo obrigatório"),
  description: yup.string()
    .required("Campo obrigatório"),
  price: yup.number()
    .typeError("Digite apenas números")
    .positive("Digite apenas números positivos")
    .required("Campo obrigatório"),
  tel: yup.string()
    .required("Campo obrigatório")
    .matches(/^[0-9]+$/, "Digite apenas números")
    .min(11, 'Insira um telefone válido')
    .max(11, 'Insira um telefone válido'),
  files: yup.array()
    .min(1, "Selecione pelo menos uma foto")
    .required("Campo obrigatório"),
})

export {
  initialValues,
  validationSchema
}