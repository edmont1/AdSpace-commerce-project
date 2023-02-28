import * as React from 'react'
import { 
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
} from '@mui/material'

import Link from '@mui/material/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { NextPage } from 'next/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { initialValues, validationSchema, valuesSigninType } from '../../../src/utils/signinpage/formValues'
import CircularProgress from '@mui/material/CircularProgress'
import { Alert, IconButton, useTheme } from '@mui/material'
import { signIn, SignInResponse } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Image from 'next/dist/client/image'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import useColorSchema from '../../../src/contexts/ColorSchema'


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        AdSpace
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

interface submitFormType {
  setSubmitting: (isSubmitting: boolean) => void
  values: valuesSigninType
}

const SigninPage: NextPage = () => {
  const router = useRouter()
  const theme = useTheme()
  const { status } = useSession()
  const [sign, setSign] = useState<SignInResponse | undefined>()
  const [isEmailLogin, setIsEmailLogin] = useState(false)
  const { toggleColorMode } = useColorSchema()

  useEffect(() => {
    const nextDiv: any = document.querySelector("#__next")
    nextDiv.parentElement.style.paddingBottom = "0"
    router.replace("/auth/signin", undefined, { shallow: true })
  }, [])


  function submitForm(params: submitFormType) {
    setTimeout(async () => {
      const signResponse = await signIn("credentials", {
        email: params.values.email,
        password: params.values.password,
        redirect: false
      })
      setSign(signResponse)
      params.setSubmitting(false)
    }, 1500)

  }

  function handleLoginGoogle() {
    signIn("google", {
      callbackUrl: "/user/dashboard"
    })
  }

  function handleLoginEmailButton() {
    setIsEmailLogin(true)
  }

  if (status === "authenticated") {
    router.push("/user/dashboard")
  }


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => submitForm({ values, setSubmitting })}
    >
      {
        ({
          touched,
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                    backgroundImage: "url(https://source.unsplash.com/random)",
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Grid
                  item xs={12}
                  sm={8}
                  md={5}
                  component={Paper}
                  elevation={6}
                  sx={{ bgcolor: theme.palette.background.default }}
                  square>
                  <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                    {theme.palette.mode === "dark" ? <Brightness7Icon sx={{ color: "#fff" }} /> : <Brightness4Icon />}
                  </IconButton>
                  <Box
                    sx={{
                      mt: isEmailLogin ? theme.spacing(16) : theme.spacing(32),
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                      <LockOutlinedIcon sx={{ color: theme.palette.primary.contrastText }} />
                    </Avatar>
                    <Typography sx={{ color: theme.palette.primary.contrastText }} component="h1" variant="h5">
                      Entrar
                    </Typography>


                    <Box sx={{ textAlign: "center" }}>
                      <Box sx={{ m: theme.spacing(4) }}>
                        <Button
                          variant='contained'
                          color='primary'
                          sx={{ fontWeight: 700, display: "flex", justifyContent: "center" }}
                          fullWidth
                          startIcon={
                            <Image
                              width={20}
                              height={20}
                              src="/logo_google_svg.svg"
                              alt="login google"
                            />
                          }
                          onClick={handleLoginGoogle}
                        >
                          Entrar com Google
                        </Button>
                      </Box>

                      <Box sx={{ m: theme.spacing(4) }}>
                        <Button
                          variant='contained'
                          color='primary'
                          sx={{ fontWeight: 700, display: "flex", justifyContent: "center" }}
                          fullWidth
                          startIcon={
                            <Image
                              width={20}
                              height={20}
                              src="/mail-icon.svg"
                              alt="login email"
                              style={{ textAlign: "left" }}
                            />
                          }
                          onClick={handleLoginEmailButton}
                        >
                          Entrar com E-mail
                        </Button>
                      </Box>

                    </Box>


                    {isEmailLogin &&
                      <Box sx={{ mt: 1, width: "100%", p: theme.spacing(0, 3), color: theme.palette.primary.contrastText }}>
                        <TextField
                          margin="normal"
                          fullWidth
                          id="email"
                          label="E-mail"
                          name="email"
                          autoComplete="email"
                          autoFocus
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
                          name="password"
                          label="Senha"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          helperText={errors.password && touched.password && errors.password}
                          error={Boolean(errors.password && touched.password)}
                          onChange={handleChange}
                          value={values.password}
                          sx={
                            {
                              input: {
                                color: theme.palette.text.primary,
                                "&:-webkit-AutoFill": {
                                  "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                                }
                              },
                              label: {
                                color: theme.palette.text.primary
                              },
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: `${theme.palette.primary.contrastText}`,
                                }
                              }
                            }}
                        />
                        <FormControlLabel
                          control={<Checkbox sx={{ color: theme.palette.text.primary }} value="remember" color="primary" />}
                          label="Lembre-me"
                          sx={{ color: theme.palette.text.primary }}
                        />

                        {sign && (
                          <Box>
                            <Alert sx={{
                              bgcolor: "transparent",
                              color: `${sign.error ? "#d32f2f" : "#12BB59"}`,
                              p: 0,
                              fontWeight: "700",
                            }} variant="filled" severity={`${sign.error ? "error" : "success"}`}>
                              {
                                sign.error ?
                                  "Usuário ou senha incorretos"
                                  :
                                  "Login bem sucedido"
                              }
                            </Alert>
                          </Box>
                        )}

                        {
                          isSubmitting ? (
                            <Box
                              sx={{
                                textAlign: "center",
                                p: `${theme.spacing(0.82, 0)}`,
                              }}>
                              <CircularProgress />
                            </Box>
                          ) : (

                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 0.9, mb: 2, fontWeight: "600" }}
                            >
                              Sign In
                            </Button>

                          )
                        }

                      </Box>
                    }

                    <Box sx={{ px: 3 }} width="100%">
                      <Grid container sx={{ textAlign: !isEmailLogin ? "center" : "start", mt: theme.spacing(1) }}>
                        <Grid item xs={!isEmailLogin ? 12 : true}>
                          <Link href="#" variant="body2">
                            Esqueceu a senha?
                          </Link>
                        </Grid>
                        <Grid item xs={!isEmailLogin ? 12 : false} sx={{ mt: !isEmailLogin ? theme.spacing(2) : 0 }}>
                          <Link href="/auth/signup" variant="body2">
                            {"Não tem uma conta? Cadastre-se"}
                          </Link>
                        </Grid>
                      </Grid>
                      <Copyright sx={{ mt: !isEmailLogin ? 30.1 : 17.4, color: theme.palette.primary.contrastText }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )
        }
      }
    </Formik>

  )
}


export default SigninPage