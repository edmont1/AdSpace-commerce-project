import { Avatar, Box, Button, Container, FormControl, FormHelperText, Input, useTheme } from "@mui/material"
import Paper from "@mui/material/Paper"
import { Formik } from "formik"
import { GetServerSideProps, NextPage } from "next"
import { getServerSession } from "next-auth"
import dbConnect from "../../../src/lib/dbConnect"
import ProfilesModel from "../../../src/models/profiles.model"
import DefaultTemplate from "../../../src/templates/Default"
import Titles from "../../../src/templates/Titles"
import { authOptions } from "../../api/auth/[...nextauth]"
import { styled } from "@mui/material"
import UsersModel from "../../../src/models/users.model"
import { useState } from "react"
import { FormValues, initialValues, validationSchema } from "../../../src/utils/accounteditpage/formValues"
import { signIn } from "next-auth/react"


export interface Localization {
  [index: string]: string
}

interface Props {
  id: string
  name: string
  email: string
  hasUserOnDb: boolean
  profile: {
    localization: Localization
  }
}

const CustomBox = styled(Box)(({ theme }) => `
  padding: ${theme.spacing(1.5, 0)};
`)


const EditAccount: NextPage<Props> = ({ id, name, email, profile, hasUserOnDb }) => {
  const theme = useTheme()
  const [cepHelperText, setCepHelperText] = useState("")
  const [emailSuccess, setEmailSuccess] = useState(true)
  const [passwordIsCorrect, setPasswordIsCorrect] = useState(true)


  function handleFormSubmit(values: FormValues) {
    submitUserForm(values)
  }

  function submitProfileForm() {

  }

  function submitUserForm(values: FormValues) {
    const { id, name, email, password } = values
    const formUpdate = {
      id,
      name,
      email,
      password
    }
    fetch("/api/users", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formUpdate)
    })
      .then(async (res) => {
        res.status === 401 && setPasswordIsCorrect(false)
        res.status === 500 && setEmailSuccess(false)
        if(res.status === 200){
          const signResponse = await signIn("credentials", {
            email,
            password,
            redirect: false
          })
          if(signResponse?.ok){
            window.location.href = "/user/dashboard"
          }
        }
        
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const formValues: FormValues = {
    id,
    name,
    email,
    password: "",
    ...profile ?
      {
        cep: profile.localization.cep,
        rua: profile.localization.rua,
        bairro: profile.localization.bairro,
        cidade: profile.localization.cidade,
        estado: profile.localization.estado
      }
      :
      {
        ...initialValues
      }
  }


  return (
    <Formik
      initialValues={formValues}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
      }) => {


        async function getCep(cepValue: string) {
          setCepHelperText("")
          const cep = cepValue.replace(/\D/g, '')
          const validacep = /^[0-9]{8}$/
          if (validacep.test(cep)) {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data = await res.json()
            if (!data.erro) {
              setFieldValue("rua", data.logradouro)
              setFieldValue("bairro", data.bairro)
              setFieldValue("cidade", data.localidade)
              setFieldValue("estado", data.uf)
            }
            else {
              setCepHelperText("Cep não encontrado")
              setFieldValue("rua", "")
              setFieldValue("bairro", "")
              setFieldValue("cidade", "")
              setFieldValue("estado", "")
            }
          }
        }

        return (
          <form onSubmit={handleSubmit}>
            <DefaultTemplate>
              <Container maxWidth="md">
                <Titles title="Minha Conta" variantTitle="h4" />
                <Paper sx={{
                  p: theme.spacing(3, 10),
                }}
                >

                  {
                    hasUserOnDb &&
                    <>
                      <CustomBox>
                        <FormControl error={Boolean(errors.name && touched.name)} fullWidth variant="standard">
                          <Input
                            size="small"
                            placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            id="name"
                            name="name"
                            sx={{
                              input: {
                                "&:-webkit-autofill": {
                                  "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                                  "WebkitTextFillColor": `${theme.palette.text.primary}`
                                }
                              }
                            }}
                          />
                          {
                            touched.name && errors.name &&
                            <FormHelperText>{errors.name}</FormHelperText>
                          }
                        </FormControl>
                      </CustomBox>
                      <CustomBox>
                        <FormControl error={Boolean(errors.email && touched.email || !emailSuccess && touched.email)} fullWidth variant="standard">
                          <Input
                            size="small"
                            placeholder="E-mail"
                            value={values.email}
                            onChange={(e) => {
                              handleChange(e)
                              setEmailSuccess(true)
                            }}
                            id="email"
                            name="email"
                            sx={{
                              input: {
                                "&:-webkit-autofill": {
                                  "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                                  "WebkitTextFillColor": `${theme.palette.text.primary}`
                                }
                              }
                            }}
                          />
                          {
                            !emailSuccess && touched.email &&
                            <FormHelperText>E-mail já cadastrado</FormHelperText>
                          }
                          {
                            touched.email && errors.email &&
                            <FormHelperText>{errors.email}</FormHelperText>
                          }
                        </FormControl>
                      </CustomBox>
                    </>
                  }
                  <CustomBox>
                    <FormControl error={Boolean(errors.cep && touched.cep || cepHelperText)} fullWidth variant="standard">
                      <Input
                        size="small"
                        placeholder="Cep (apenas números, opcional)"
                        value={values.cep}
                        onChange={handleChange}
                        onBlur={() => getCep(values.cep)}
                        id="cep"
                        name="cep"
                        sx={{
                          input: {
                            "&:-webkit-autofill": {
                              "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                              "WebkitTextFillColor": `${theme.palette.text.primary}`
                            }
                          }
                        }}
                      />
                      {
                        errors.cep && touched.cep &&
                        <FormHelperText>{errors.cep}</FormHelperText>
                      }
                      {
                        <FormHelperText error={Boolean(cepHelperText)}>{cepHelperText}</FormHelperText>
                      }
                    </FormControl>
                  </CustomBox>
                  <CustomBox>
                    <FormControl fullWidth variant="standard">
                      <Input
                        size="small"
                        placeholder="Rua (opcional)"
                        value={values.rua}
                        onChange={handleChange}
                        id="rua"
                        name="rua"
                        sx={{
                          input: {
                            "&:-webkit-autofill": {
                              "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                              "WebkitTextFillColor": `${theme.palette.text.primary}`
                            }
                          }
                        }}
                      />
                    </FormControl>
                  </CustomBox>
                  <CustomBox>
                    <FormControl fullWidth variant="standard">
                      <Input
                        size="small"
                        placeholder="Bairro (opcional)"
                        value={values.bairro}
                        onChange={handleChange}
                        id="bairro"
                        name="bairro"
                        sx={{
                          input: {
                            "&:-webkit-autofill": {
                              "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                              "WebkitTextFillColor": `${theme.palette.text.primary}`
                            }
                          }
                        }}
                      />
                    </FormControl>
                  </CustomBox>
                  <CustomBox>
                    <FormControl error={Boolean(errors.cidade && touched.cidade)} fullWidth variant="standard">
                      <Input
                        size="small"
                        placeholder="Cidade"
                        value={values.cidade}
                        onChange={handleChange}
                        id="cidade"
                        name="cidade"
                        sx={{
                          input: {
                            "&:-webkit-autofill": {
                              "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                              "WebkitTextFillColor": `${theme.palette.text.primary}`
                            }
                          }
                        }}
                      />
                      {
                        touched.cidade &&
                        <FormHelperText>{errors.cidade}</FormHelperText>
                      }
                    </FormControl>
                  </CustomBox>

                  <CustomBox>
                    <FormControl error={Boolean(errors.estado && touched.estado)} fullWidth variant="standard">
                      <Input
                        size="small"
                        placeholder="Estado"
                        value={values.estado}
                        onChange={handleChange}
                        id="estado"
                        name="estado"
                        sx={{
                          input: {
                            "&:-webkit-autofill": {
                              "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                              "WebkitTextFillColor": `${theme.palette.text.primary}`
                            }
                          }
                        }}
                      />
                      {
                        touched.estado &&
                        <FormHelperText>{errors.estado}</FormHelperText>
                      }
                    </FormControl>
                  </CustomBox>

                  <CustomBox>
                    <FormControl error={Boolean(errors.password && touched.password || touched.password && !passwordIsCorrect)} fullWidth variant="standard">
                      <Input
                        size="small"
                        placeholder="Confirmar senha"
                        value={values.password}
                        onChange={(e) => {
                          handleChange(e)
                          setPasswordIsCorrect(true)
                        }}
                        id="password"
                        name="password"
                        type="password"
                        sx={{
                          input: {
                            "&:-webkit-autofill": {
                              "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                              "WebkitTextFillColor": `${theme.palette.text.primary}`
                            }
                          }
                        }}
                      />
                      {
                        touched.password && !passwordIsCorrect &&
                        <FormHelperText>Senha incorreta</FormHelperText>
                      }
                      {
                        touched.password &&
                        <FormHelperText>{errors.password}</FormHelperText>
                      }
                    </FormControl>
                  </CustomBox>

                  <Box textAlign="right">
                    <Button
                      type="submit"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.contrastText
                      }}
                      variant="contained"
                    >
                      Editar Perfil
                    </Button>
                  </Box>
                </Paper>
              </Container>
            </DefaultTemplate>
          </form>
        )
      }}
    </Formik>
  )
}



interface SessionUser {
  [index: string]: string
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  const { id, name, email } = session?.user as SessionUser
  await dbConnect()
  const user = await UsersModel.findOne({ _id: id })
  let hasUserOnDb = false
  if (id === user?._id) {
    hasUserOnDb = true
  }
  const profile = await ProfilesModel.findOne({ "user.id": id })
  session?.user?.image ? session.user.image : null

  console.log(profile)

  return ({
    props: {
      id,
      name,
      email,
      hasUserOnDb,
      ...profile &&
      {
        profile: JSON.parse(JSON.stringify(profile))
      },
      ...session?.user?.image &&
      {
        image: session?.user?.image,
      }
    }
  })
}

export default EditAccount