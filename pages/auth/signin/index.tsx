import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Formik } from 'formik';
import { initialValues, validationSchema, valuesSigninType } from './formValues';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, useTheme } from '@mui/material';
import { signIn, SignInResponse } from 'next-auth/react';
import { useSession } from 'next-auth/react'
import { useState } from "react"
import Image from 'next/dist/client/image';




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
  );
}

interface submitFormType {
  setSubmitting: (isSubmitting: boolean) => void
  values: valuesSigninType
}

const SigninPage: NextPage = () => {
  const router = useRouter()
  const theme = useTheme()
  const session = useSession()
  const [sign, setSign] = useState<SignInResponse | undefined>()
  const [isEmailLogin, setIsEmailLogin] = useState(false)

  useEffect(() => {
    const nextDiv: any = document.querySelector("#__next")
    nextDiv.parentElement.style.paddingBottom = "0"
  }, [])

  console.log(session)

  function submitForm(params: submitFormType) {
    setTimeout(async () => {
      const signResponse = await signIn("credentials", {
        email: params.values.email,
        password: params.values.password,
        redirect: false
      })
      setSign(signResponse)
      params.setSubmitting(false)
      if (signResponse?.ok) {
        setTimeout(() => {
          router.push("/user/dashboard")
        }, 800)
      }
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

                  square>
                  <Box
                    sx={{
                      my: isEmailLogin? theme.spacing(19) : theme.spacing(32),
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                      <LockOutlinedIcon sx={{ color: theme.palette.primary.contrastText }} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
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
                      <Box sx={{ mt: 1 }}>
                        <TextField
                          margin="normal"
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          helperText={errors.email && touched.email && errors.email}
                          error={Boolean(errors.email && touched.email)}
                          onChange={handleChange}
                          value={values.email}
                        />
                        <TextField
                          margin="normal"
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          helperText={errors.password && touched.password && errors.password}
                          error={Boolean(errors.password && touched.password)}
                          onChange={handleChange}
                          value={values.password}
                        />
                        <FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Remember me"
                        />

                        {sign && (
                          <Box>
                            <Alert sx={{
                              bgcolor: "white",
                              color: `${sign.error ? "#d32f2f" : "green"}`,
                              p: 0
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
                                p: `${theme.spacing(2)}`
                              }}>
                              <CircularProgress />
                            </Box>
                          ) : (
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2, fontWeight: "600" }}
                            >
                              Sign In
                            </Button>
                          )
                        }
                        <Grid container>
                          <Grid item xs>
                            <Link href="#" variant="body2">
                              Forgot password?
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link href="/auth/signup" variant="body2">
                              {"Don't have an account? Sign Up"}
                            </Link>
                          </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                      </Box>
                    }
                  </Box>
                </Grid>
              </Grid>
            </form>
          )
        }
      }
    </Formik>

  );
}


export default SigninPage