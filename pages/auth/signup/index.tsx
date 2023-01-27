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
  Box} from "@mui/material"
import { Formik } from "formik"
import { NextPage } from "next"
import Link from "next/link"
import DefaultTemplate from "../../../src/templates/Default"
import Titles from "../../../src/templates/Titles"
import { initialValues, validationSchema } from "./formValues"


const CustomFormControl = styled(FormControl)(({ theme }) => `
  padding: ${theme.spacing(1, 0)};

`)

const SignUp: NextPage = () => {
  const theme = useTheme()
  return (
    <DefaultTemplate>
      <Titles title="Crie sua conta" subtitle="E anuncie para todo o Brasil"/>
      <Container maxWidth="md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log("enviado", values)}
        >
          {
            ({values,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Paper sx={{
                    p: theme.spacing(3)
                  }}>
                    <CustomFormControl error={Boolean(errors.name && touched.name)} fullWidth variant="standard">
                      <Input value={values.name} onChange={handleChange} name="name" id="name" placeholder="Name" />
                      {
                        errors.name && touched.name &&
                        <FormHelperText>{errors.name}</FormHelperText>
                      }
                    </CustomFormControl>
                    <CustomFormControl error={Boolean(errors.email && touched.email)} fullWidth variant="standard">
                      <Input type="email" value={values.email} onChange={handleChange} name="email" id="email" placeholder="E-mail" />
                      {
                        errors.email && touched.email &&
                        <FormHelperText>{errors.email}</FormHelperText>
                      }
                    </CustomFormControl>
                    <CustomFormControl error={Boolean(errors.pwd && touched.pwd)} fullWidth variant="standard">
                      <Input type="password" value={values.pwd} onChange={handleChange} name="pwd" id="pwd" placeholder="Senha" />
                      {
                        errors.pwd && touched.pwd &&
                        <FormHelperText>{errors.pwd}</FormHelperText>
                      }
                    </CustomFormControl>
                    <CustomFormControl error={Boolean(errors.pwdconfirm && touched.pwdconfirm)} fullWidth variant="standard">
                      <Input type="password" value={values.pwdconfirm} onChange={handleChange} name="pwdconfirm" id="pwdconfirm" placeholder="Confirmar senha" />
                      {
                        errors.pwdconfirm && touched.pwdconfirm &&
                        <FormHelperText>{errors.pwdconfirm}</FormHelperText>
                      }
                    </CustomFormControl>
                    <Button type="submit" fullWidth
                      sx={{
                        mt: theme.spacing(3),
                        fontWeight: "600"
                      }}
                      variant="contained">
                      Cadastrar
                    </Button>

                    <Box sx={{
                      display:"flex",
                      pt: theme.spacing(2),
                      "& a": {
                        color: "inherit"
                      },
                      "& a:hover":{
                        color: `${theme.palette.primary.main}`
                      }
                      }}>
                      <Typography sx={{mr: theme.spacing(1)}} component="p" variant="body2">
                        Já tem uma conta?
                      </Typography>
                      <Link href="/signin">
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