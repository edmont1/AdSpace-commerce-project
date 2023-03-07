import * as yup from "yup"

export interface FormValues {
  id: string
  name: string
  email: string
  cep: string
  rua: string
  bairro: string
  cidade: string
  estado: string
  image?: string
  password: string
}

const initialValues = {
  cep: "",
  rua: "",
  bairro: "",
  cidade: "",
  estado: "",
  image: "",
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Campo obrigatório"),
  email: yup.string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  cep: yup.string()
    .matches(/^[0-9]{8}$/, "Cep Inválido"),
  rua: yup.string(),
  bairro: yup.string(),
  cidade: yup.string()
    .required("Campo obrigatório"),
  estado: yup.string()
    .required("Campo obrigatório"),
  password: yup.string()
    .required("Campo obrigatório")
    .min(8, "Mínimo de 8 caracteres"),
})


export {
  initialValues,
  validationSchema
}
