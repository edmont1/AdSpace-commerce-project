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
import { NextPage } from "next/types"

import DefaultTemplate from "../../../src/templates/Default"
import { validationSchema, initialValues, FormValues } from "./formValues"
import { CustomDiv } from "./style"

import { Formik } from "formik"
import UploadFiles from "../../../src/components/UploadFiles"
import Titles from "../../../src/templates/Titles"



const Publish: NextPage = () => {
  const theme = useTheme()

  function handleFormSubmit(values: FormValues) {
    const formData = new FormData()
    for(let field in values){
      if(field === "files"){
        values.files.forEach(file => {
          formData.append("files", file)
        })
      }
      else{
        formData.append(field, values[field])
      }
    }

    fetch("/api/products", {
      method: "POST",
      body: formData
    })
    .then((res) => {
      res.json().then((data) =>{
        console.log(data)
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
        initialValues={initialValues}
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
            setFieldValue
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
                          <MenuItem value="Option 1">Option 1</MenuItem>
                          <MenuItem value="Option 2">Option 2</MenuItem>
                          <MenuItem value="Option 3">Option 3</MenuItem>
                          <MenuItem value="Option 4">Option 4</MenuItem>
                          <MenuItem value="Option 5">Option 5</MenuItem>
                          <MenuItem value="Option 6">Option 6</MenuItem>
                          <MenuItem value="Option 7">Option 7</MenuItem>
                          <MenuItem value="Option 8">Option 8</MenuItem>
                          <MenuItem value="Option 9">Option 9</MenuItem>
                          <MenuItem value="Option 10">Option 10</MenuItem>
                          <MenuItem value="Option 11">Option 11</MenuItem>
                          <MenuItem value="Option 12">Option 12</MenuItem>
                          <MenuItem value="Option 13">Option 13</MenuItem>
                          <MenuItem value="Option 14">Option 14</MenuItem>
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
                      <FormControl error={Boolean(errors.name && touched.name)} fullWidth variant="standard">
                        <Input
                          size="small"
                          placeholder="Nome"
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
                          errors.name && touched.name &&
                          <FormHelperText>{errors.name}</FormHelperText>
                        }
                      </FormControl>
                    </CustomDiv>
                    <CustomDiv>
                      <FormControl error={Boolean(errors.email && touched.email)} fullWidth variant="standard">
                        <Input
                          size="small"
                          placeholder="E-mail"
                          value={values.email}
                          onChange={handleChange}
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
                          errors.email && touched.email &&
                          <FormHelperText>{errors.email}</FormHelperText>
                        }
                      </FormControl>
                    </CustomDiv>
                    <CustomDiv>
                      <FormControl error={Boolean(errors.tel && touched.tel)} fullWidth variant="standard">
                        <Input
                          size="small"
                          placeholder="Telefone"
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

export default Publish