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
  const [authError, setAuthError] = useState({} as SignInResponse | undefined)


  console.log(session)

  useEffect(() => {
    const nextDiv: any = document.querySelector("#__next")
    nextDiv.parentElement.style.paddingBottom = "0"
  }, [])


  function submitForm(params: submitFormType) {
    setTimeout(async () => {
      const sign = await signIn("credentials", {
        email: params.values.email,
        password: params.values.password,
        redirect: false
      })
      setAuthError(sign)
      params.setSubmitting(false)
      if (sign?.ok) {
        router.push("/user/dashboard")
      }
    }, 1500)

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
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
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

                      {authError?.status &&(
                        <Box>
                          <Alert sx={{
                            bgcolor: "white",
                            color: `${authError.error ? "#d32f2f" : "green"}`,
                            p: 0
                          }} variant="filled" severity={`${authError.error ? "error" : "success"}`}>
                            {
                              authError.error ? 
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