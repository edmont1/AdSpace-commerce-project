import {
  Button,
  Container,
  Input,
  Paper,
  Typography,
  useTheme,
  styled,
  FormControl,
  FormHelperText,
  Box,
  Alert,
  CircularProgress,
  TextField
} from "@mui/material"
import { Formik } from "formik"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import DefaultTemplate from "../../../src/templates/Default"
import Titles from "../../../src/templates/Titles"
import { initialValuesSignUp, ValuesSignUpType, validationSchema } from "../../../src/utils/signuppage/formValues"


interface Props {
  APP_URL: typeof process.env.APP_URL
}
interface Response {
  success?: boolean
  message?: string
}
interface submitFormType {
  values: ValuesSignUpType
  setSubmitting: (isSubmitting: boolean) => void
}


const SignUp: NextPage<Props> = ({ APP_URL }) => {
  const theme = useTheme()
  const router = useRouter()
  const [response, setResponse] = useState<Response>({})


  function submitForm(params: submitFormType) {
    fetch(`${APP_URL}/api/users`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.values)
    })
      .then((data) => {
        data.json().then((data) => {
          setTimeout(() => {
            params.setSubmitting(false)
            setResponse(data)
            if (data.success) {
              setTimeout(() => {
                router.push("/auth/signin")
              }, 1000)
            }
          }, 1500)
        })
      })
  }


  return (
    <DefaultTemplate>
      <Titles title="Crie sua conta" subtitle="E anuncie para todo o Brasil" />
      <Container maxWidth="sm">
        <Formik
          initialValues={initialValuesSignUp}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            submitForm({ values, setSubmitting })
          }}
        >
          {
            ({ values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Paper sx={{
                    p: theme.spacing(3)
                  }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="name"
                      label="Nome"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      helperText={errors.name && touched.name && errors.name}
                      error={Boolean(errors.name && touched.name)}
                      onChange={handleChange}
                      value={values.name}
                      sx={{
                        input: {
                          color: theme.palette.text.primary,
                          "&:-webkit-AutoFill": {
                            "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                          }
                        },

                        label: {
                          color: theme.palette.text.primary,
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: `${theme.palette.primary.contrastText}`,
                          }
                        }
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="email"
                      label="E-mail"
                      name="email"
                      autoComplete="email"
                      helperText={errors.email && touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      onChange={handleChange}
                      value={values.email}
                      sx={{
                        input: {
                          color: theme.palette.text.primary,
                          "&:-webkit-AutoFill": {
                            "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                          }
                        },

                        label: {
                          color: theme.palette.text.primary,
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: `${theme.palette.primary.contrastText}`,
                          }
                        }
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="password"
                      label="Senha"
                      name="password"
                      autoComplete="password"
                      type="password"
                      helperText={errors.password && touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      onChange={handleChange}
                      value={values.password}
                      sx={{
                        input: {
                          color: theme.palette.text.primary,
                          "&:-webkit-AutoFill": {
                            "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                          }
                        },

                        label: {
                          color: theme.palette.text.primary,
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: `${theme.palette.primary.contrastText}`,
                          }
                        }
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="passwordconfirm"
                      label="Confirmar senha"
                      name="passwordconfirm"
                      autoComplete="passwordconfirm"
                      type="password"
                      helperText={errors.passwordconfirm && touched.passwordconfirm && errors.passwordconfirm}
                      error={Boolean(errors.passwordconfirm && touched.passwordconfirm)}
                      onChange={handleChange}
                      value={values.passwordconfirm}
                      sx={{
                        input: {
                          color: theme.palette.text.primary,
                          "&:-webkit-AutoFill": {
                            "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                          }
                        },

                        label: {
                          color: theme.palette.text.primary,
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: `${theme.palette.primary.contrastText}`,
                          }
                        }
                      }}
                    />

                    {
                      response.message &&
                      <Alert sx={{
                        bgcolor: "white",
                        color: `${response.success ? "#12BB59" : "#d32f2f"}`,
                        p: 0,
                        backgroundColor: "transparent",
                        fontWeight: "700"
                      }} variant="filled" severity={response.success ? "success" : "error"}>
                        {response.message}
                      </Alert>
                    }

                    {
                      isSubmitting ? (
                        <Box
                          sx={{
                            textAlign: "center",
                            p: `${theme.spacing(1.1, 0)}`
                          }}>
                          <CircularProgress />
                        </Box>
                      ) : (
                        <Button disabled={isSubmitting} type="submit" fullWidth
                          sx={{
                            mt: theme.spacing(3.5),
                            fontWeight: "600"
                          }}
                          variant="contained">
                          Cadastrar
                        </Button>
                      )
                    }

                    <Box sx={{
                      display: "flex",
                      pt: theme.spacing(2),
                      "& a": {
                        color: "inherit"
                      },
                      "& a:hover": {
                        color: `${theme.palette.primary.main}`
                      }
                    }}>
                      <Typography sx={{ mr: theme.spacing(1) }} component="p" variant="body2">
                        Já tem uma conta?
                      </Typography>
                      <Link href="/auth/signin">
                        <Typography component="p" variant="body2">
                          Logue aqui
                        </Typography>
                      </Link>
                    </Box>
                  </Paper>
                </form>
              )
            }
          }
        </Formik>
      </Container>
    </DefaultTemplate>
  )
}

export function getServerSideProps() {
  return {
    props: {
      APP_URL: process.env.APP_URL
    }
  }
}

export default SignUp