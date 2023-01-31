import * as yup from "yup"

export interface valuesSigninType{
  email: string
  password: string
}

const initialValues : valuesSigninType = {
  email: "",
  password: ""
}

const validationSchema = yup.object().shape({
  email: yup.string()
    .email("Digite um e-mail válido")
    .required("Campo Obrigatório"),
  password: yup.string()
    .required("Campo Obrigatório")
    .min(8, "Mínimo de 8 caracteres")
})


export {
  initialValues,
  validationSchema
}


