import {
  Box,
  Button,
  Container,
  Input,
  Paper,
  TextField,
  useTheme,
  Typography,
  InputAdornment,
  FormHelperText,
  FormControl,
  Select,
  MenuItem
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next/types"

import DefaultTemplate from "../../../src/templates/Default"
import { validationSchema, initialValues, FormValues } from "../../../src/utils/publishpage/formValues"
import { CustomDiv } from "../../../styles/publish.style"

import { Formik } from "formik"
import UploadFiles from "../../../src/components/UploadFiles"
import Titles from "../../../src/templates/Titles"
import { useRouter } from "next/router"
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"
import useToasty from "../../../src/contexts/Toasty"
import { useState } from "react"


interface userProps {
  id: string
  image: string
  name: string
  email: string
}

interface ValuesWithDate extends FormValues {
  time: string,
  day: string
}

const Publish: NextPage<userProps> = ({ id, image, name, email }) => {
  const theme = useTheme()
  const router = useRouter()
  const { setToasty } = useToasty()

  const [cepHelperText, setCepHelperText] = useState("")

  const formValues = {
    ...initialValues,
    id,
    image,
    email,
    name
  }

  function handleFormSubmit(values: FormValues) {
    const date = new Date()
    const time = date.toLocaleTimeString("pt-br")
    const day = date.toLocaleDateString("pt-br")
    values.title = values.title.charAt(0).toUpperCase() + values.title.slice(1)

    const valuesWithDate: ValuesWithDate = {
      ...values,
      time,
      day,
    }

    const formData = new FormData()
    for (let field in valuesWithDate) {
      if (field === "files") {
        valuesWithDate.files.forEach(file => {
          formData.append("files", file)
        })
      }
      else {
        formData.append(field, valuesWithDate[field])
      }
    }

    fetch(`/api/products`, {
      method: "POST",
      body: formData,
      
    })
      .then((res) => {
        res.json().then((data) => {
          if(data.success){
            setToasty({
              open: true,
              severity: "success",
              message: "Anúncio publicado com sucesso",
              autoHide: 2000
            })
            setTimeout(() => {
              router.push("/user/dashboard")
            }, 2000)
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <DefaultTemplate>
      <Titles title="Publicar Anúncio" subtitle="Publicar Anúncio" />

      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {
          ({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting
          }) => {

            return (
              <form onSubmit={handleSubmit}>
                <Container maxWidth="md">
                  <Paper sx={{
                    padding: theme.spacing(3),
                  }}>

                    <CustomDiv>
                      <Typography fontWeight={600} component="h3" variant="body1">
                        Título do anúncio
                      </Typography>


                      {/* <Input type="hidden"  value={values.image}/> */}
                      <FormControl error={Boolean(errors.title && touched.title)} variant="standard" fullWidth>
                        <Input
                          id="title"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          sx={{
                            mt: "10px",
                            input: {
                              "&:-webkit-autofill": {
                                "WebkitBoxShadow": `0 0 0 100px ${theme.palette.background.default} inset`,
                                "WebkitTextFillColor": `${theme.palette.text.primary}`
                              }
                            }
                          }}
                          size="small"
                          placeholder="ex.:Computador" />
                        {
                          errors.title && touched.title &&
                          <FormHelperText>{errors.title}</FormHelperText>
                        }
                      </FormControl>
                    </CustomDiv>

                    <CustomDiv>
                      <Typography fontWeight={600} component="h3" variant="body1">
                        Categoria
                      </Typography>
                      <FormControl error={Boolean(errors.category && touched.category)} variant="standard" fullWidth>
                        <Select
                          onChange={handleChange}
                          id="category"
                          name="category"
                          value={values.category}
                        >
                          <MenuItem disabled value={""} >Selecione</MenuItem>
                          <MenuItem value="Imóveis">Imóveis</MenuItem>
                          <MenuItem value="Veículos e peças">Veículos e peças</MenuItem>
                          <MenuItem value="Eletrônicos e celulares">Eletrônicos e celulares</MenuItem>
                          <MenuItem value="Casa">Casa</MenuItem>
                          <MenuItem value="Serviços">Serviços</MenuItem>
                          <MenuItem value="Músicas e hobbies">Músicas e hobbies</MenuItem>
                          <MenuItem value="Esportes e lazer">Esportes e lazer</MenuItem>
                          <MenuItem value="Moda e beleza">Moda e beleza</MenuItem>
                          <MenuItem value="Nutrição e Saúde">Nutrição e Saúde</MenuItem>
                          <MenuItem value="Brinquedos">Brinquedos</MenuItem>
                          <MenuItem value="Construção">Construção</MenuItem>
                          <MenuItem value="Bebês">Bebês</MenuItem>
                        </Select>
                        {
                          errors.category && touched.category &&
                          <FormHelperText>{errors.category}</FormHelperText>
                        }
                      </FormControl>
                    </CustomDiv>
                  </Paper>

                  <Paper sx={{
                    padding: theme.spacing(3),
                    margin: theme.spacing(3, 0)
                  }}>
                    <CustomDiv>
                      <Typography fontWeight={600} component={"h4"} variant="body1">
                        Imagens
                      </Typography>
                      <Typography sx={{ mb: "10px" }} component="p" variant="body2">
                        A primeira imagem é a foto principal do anúncio.
                      </Typography>

                      <UploadFiles files={values.files} errors={errors.files} touched={touched.files} setFieldValue={setFieldValue} />

                    </CustomDiv>
                  </Paper>

                  <Paper sx={{
                    padding: theme.spacing(3),
                    margin: theme.spacing(3, 0)
                  }}>
                    <Box>
                      <Typography fontWeight={600} component="h3" variant="body1">
                        Descrição
                      </Typography>
                      <Typography component="p" variant="body2">
                        Descreva em detalhes o produto à venda
                      </Typography>
                      <TextField
                        id="description"
                        name="description"
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ mt: "10px" }}
                        onChange={handleChange}
                        value={values.description}
                        error={Boolean(errors.description && touched.description)}
                      />
                      {
                        errors.description && touched.description &&
                        <FormHelperText error={Boolean(errors.description && touched.description)}>
                          {errors.description}
                        </FormHelperText>
                      }
                    </Box>
                  </Paper>

                  <Paper sx={{
                    padding: theme.spacing(3),
                    margin: theme.spacing(3, 0),
                  }}>
                    <FormControl error={Boolean(errors.price && touched.price)} variant="standard" fullWidth>
                      <Typography fontWeight={600} component="h3" variant="body1">
                        Preço
                      </Typography>
                      <Input
                        onChange={handleChange}
                        startAdornment={<InputAdornment
                          position="start"
                        >R$</InputAdornment>}
                        value={values.price}
                        id="price"
                        name="price"
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
                        errors.price && touched.price &&
                        <FormHelperText>{errors.price}</FormHelperText>
                      }
                    </FormControl>
                  </Paper>

                  <Paper sx={{
                    padding: theme.spacing(3),
                    margin: theme.spacing(3, 0),
                  }}>

                    <CustomDiv>
                      <Typography fontWeight={600} component="h3" variant="body1">
                        Dados de Contato
                      </Typography>
                    </CustomDiv>
                    <CustomDiv>
                      <FormControl error={Boolean(errors.tel && touched.tel)} fullWidth variant="standard">
                        <Input
                          size="small"
                          placeholder="Telefone (incluir DDD)"
                          value={values.tel}
                          onChange={handleChange}
                          id="tel"
                          name="tel"
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
                          errors.tel && touched.tel &&
                          <FormHelperText>{errors.tel}</FormHelperText>
                        }
                      </FormControl>
                    </CustomDiv>
                  </Paper>

                  <Box textAlign="right">
                    <Button
                      type="submit"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.contrastText
                      }}
                      variant="contained"
                      disabled={isSubmitting}
                    >
                      Publicar Anúncio
                    </Button>
                  </Box>
                </Container>
              </form>
            )
          }
        }
      </Formik>
    </DefaultTemplate>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  const { id, image, name, email } = session?.user as userProps
  return ({
    props: {
      id,
      image: image || null,
      name,
      email,
    }
  })
}

export default Publish