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
  CircularProgress
} from "@mui/material"
import { Formik } from "formik"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import DefaultTemplate from "../../../src/templates/Default"
import Titles from "../../../src/templates/Titles"
import { initialValuesSignUp, ValuesSignUpType, validationSchema } from "./formValues"


const CustomFormControl = styled(FormControl)(({ theme }) => `
  padding: ${theme.spacing(1, 0)};

`)

interface submitFormType {
  values: ValuesSignUpType
  setSubmitting: (isSubmitting: boolean) => void
}

const SignUp: NextPage = () => {

  const router = useRouter()

  interface Response {
    success?: boolean
    message?: string
  }
  const [response, setResponse] = useState<Response>({})


  function submitForm(params: submitFormType) {
    fetch("http://localhost:3000/api/users", {
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
            if (data.success === true) {
              setTimeout(() => {
                router.push("/auth/signin")
              }, 1000)
            }
          }, 1500)
        })
      })

  }

  const theme = useTheme()
  return (
    <DefaultTemplate>
      <Titles title="Crie sua conta" subtitle="E anuncie para todo o Brasil" />
      <Container maxWidth="md">
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
                    <CustomFormControl error={Boolean(errors.name && touched.name)} fullWidth variant="standard">
                      <Input autoComplete="username" value={values.name} onChange={handleChange} name="name" id="name" placeholder="Name" />
                      {
                        errors.name && touched.name &&
                        <FormHelperText>{errors.name}</FormHelperText>
                      }
                    </CustomFormControl>
                    <CustomFormControl error={Boolean(errors.email && touched.email)} fullWidth variant="standard">
                      <Input autoComplete="username" type="email" value={values.email} onChange={handleChange} name="email" id="email" placeholder="E-mail" />
                      {
                        errors.email && touched.email &&
                        <FormHelperText>{errors.email}</FormHelperText>
                      }
                    </CustomFormControl>
                    <CustomFormControl error={Boolean(errors.password && touched.password)} fullWidth variant="standard">
                      <Input autoComplete="new-password" type="password" value={values.password} onChange={handleChange} name="password" id="password" placeholder="Senha" />
                      {
                        errors.password && touched.password &&
                        <FormHelperText>{errors.password}</FormHelperText>
                      }
                    </CustomFormControl>
                    <CustomFormControl error={Boolean(errors.passwordconfirm && touched.passwordconfirm)} fullWidth variant="standard">
                      <Input autoComplete="new-password" type="password" value={values.passwordconfirm} onChange={handleChange} name="passwordconfirm" id="passwordconfirm" placeholder="Confirmar senha" />
                      {
                        errors.passwordconfirm && touched.passwordconfirm &&
                        <FormHelperText>{errors.passwordconfirm}</FormHelperText>
                      }
                    </CustomFormControl>

                    {
                      response.message &&
                      <Alert sx={{
                        bgcolor: "white",
                        color: `${response.success ? "green" : "#d32f2f"}`,
                        p: 0
                      }} variant="filled" severity={response.success ? "success" : "error"}>
                        {response.message}
                      </Alert>
                    }

                    {
                      isSubmitting ? (
                        <Box
                          sx={{
                            textAlign: "center",
                            p: `${theme.spacing(3)}`
                          }}>
                          <CircularProgress />
                        </Box>
                      ) : (
                        <Button disabled={isSubmitting} type="submit" fullWidth
                          sx={{
                            mt: theme.spacing(3),
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

export default SignUp