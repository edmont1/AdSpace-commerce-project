import * as yup from "yup"

const initialValues = {
  name: "",
  email: "",
  pwd: "",
  pwdconfirm: ""
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required("Campo obrigatório"),
  email: yup.string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  pwd: yup.string()
    .required("Campo obrigatório")
    .min(8, "Mínimo de 8 caracteres"),
  pwdconfirm: yup.string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("pwd")], "As senhas devem ser iguais")
})

export {
  initialValues,
  validationSchema
}