import * as yup from "yup"

interface FormValues {
  title: string,
  category: string,
  files: any[],
  description: string,
  price: string,
  name: string,
  email: string,
  tel: string
}

const initialValues: FormValues = {
  title: "",
  category: "",
  files: [],
  description: "",
  price: "",
  name: "",
  email: "",
  tel: ""
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
    .required("Campo obrigatório")
})

export{
  initialValues,
  validationSchema
}