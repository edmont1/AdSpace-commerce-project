import * as yup from "yup"

export interface ValuesSignUpType{
  name: string
  email: string
  password: string
  passwordconfirm: string
}

const initialValuesSignUp : ValuesSignUpType = {
  name: "",
  email: "",
  password: "",
  passwordconfirm: ""
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Campo obrigatório"),
  email: yup.string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  password: yup.string()
    .required("Campo obrigatório")
    .min(8, "Mínimo de 8 caracteres"),
  passwordconfirm: yup.string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
})

export {
  initialValuesSignUp,
  validationSchema
}