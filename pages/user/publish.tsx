import {
  Box,
  Button,
  Container,
  Input,
  Paper,
  TextField,
  Theme,
  useTheme,
  styled,
  Typography,
  InputAdornment,
  FormHelperText,
  FormControl,
  Select,
  MenuItem
} from "@mui/material"
import { NextPage } from "next/types"
import DefaultTemplate from "../../src/templates/Default"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useState } from "react"

import { useDropzone } from 'react-dropzone'
import { Formik } from "formik"
import * as yup from "yup"

const CustomDiv = styled("div")(({ theme }) => `
  padding-bottom: ${theme.spacing(3)};
  &:last-child{
    padding-bottom: 0
  }
`)

const validationSchema = yup.object().shape({
  title: yup.string()
    .required("Campo obrigatório"),
  category: yup.string()
    .required("Campo obrigatório"),
  description: yup.string()
    .required("Campo obrigatório"),
  price: yup.number()
    .typeError("Digite apenas números")
    .positive("Digite apenas números positivos")
    .required("Campo obrigatório"),
  name: yup.string()
    .required("Campo obrigatório"),
  email: yup.string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  tel: yup.number()
    .typeError("Digite apenas números")
    .required("Campo obrigatório")
})


const Publish: NextPage = () => {
  const theme = useTheme() as Theme

  const [files, setFiles] = useState<any[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg"]

    },
    onDrop: (acceptedFiles) => {
      console.log(typeof acceptedFiles)
      const newFiles = acceptedFiles.map((file) => (
        Object.assign(file, {
          url: URL.createObjectURL(file)
        })
      ))
      setFiles([...files, ...newFiles])
    }
  })

  function handleDeleteButton(photo: { url: string }) {
    const filterFiles = files.filter((file) => file.url !== photo.url)
    setFiles(filterFiles)
  }


  interface FormValues {
    title: string,
    category: string,
    images: {},
    description: string,
    price: string,
    name: string,
    email: string,
    tel: string
  }
  const initialValues: FormValues = {
    title: "",
    category: "",
    images: {},
    description: "",
    price: "",
    name: "",
    email: "",
    tel: ""
  }

  return (
    <DefaultTemplate>
      <Container maxWidth="sm" sx={{
        pb: theme.spacing(4),
      }}>
        <Typography align="center" component="h1" variant="h3" >
          Publicar Anúncio
        </Typography>
        <Typography align="center" component="h2" variant="h5" >
          Publicar Anúncio
        </Typography>
      </Container>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("enviado", values)
        }}
      >
        {
          ({
            values,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting
          }) => {

            


            return (
              <form onSubmit={handleSubmit}>
                <Container maxWidth="md">
                  <Paper sx={{
                    padding: theme.spacing(3),
                    bgcolor: theme.palette.background.white,
                    margin: theme.spacing(3, 0)
                  }}>

                    <CustomDiv>
                      <Typography fontWeight={600} component="h3" variant="body1">
                        Título do anúncio
                      </Typography>
                      <FormControl error={Boolean(errors.title)} variant="standard" fullWidth>
                        <Input
                          id="title"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          sx={{ mt: "10px" }}
                          size="small"
                          placeholder="ex.:Computador" />
                        <FormHelperText >{errors.title}</FormHelperText>
                      </FormControl>
                    </CustomDiv>

                    <CustomDiv>
                      <Typography fontWeight={600} component="h3" variant="body1">
                        Categoria
                      </Typography>
                      <FormControl error={Boolean(errors.category)} variant="standard" fullWidth>
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
                        <FormHelperText>{errors.category}</FormHelperText>
                      </FormControl>
                    </CustomDiv>
                  </Paper>

                  <Paper sx={{
                    padding: theme.spacing(3),
                    bgcolor: theme.palette.background.white,
                    margin: theme.spacing(3, 0)
                  }}>
                    <CustomDiv>
                      <Typography fontWeight={600} component={"h4"} variant="body1">
                        Imagens
                      </Typography>
                      <Typography sx={{ mb: "10px" }} component="p" variant="body2">
                        A primeira imagem é a foto principal do anúncio.
                      </Typography>
                      <Box sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "repeat(2, minmax(100px, 1fr))",
                          sm: "repeat(3, minmax(100px, 1fr))",
                          md: "repeat(4, minmax(100px, 1fr))"
                        },
                        gap: "10px",
                      }}>

                        <Box {...getRootProps()} sx={{
                          cursor: "pointer",
                          border: "2px dashed grey",
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                          padding: "10px",
                          height: "250px",
                        }} >
                          <input {...getInputProps()} type="text" />
                          <Typography variant="body1" sx={{
                            color: "grey"
                          }}>
                            Clique para adicionar ou arraste a imagem até aqui.
                          </Typography>
                        </Box>


                        {files.map((photo, index) => {
                          return (
                            <Box key={index} sx={{
                              height: "250px",
                              position: "relative",
                              "&:hover": {
                                "#delete-icon": {
                                  display: "block"
                                },
                                ".overlay": {
                                  bgcolor: "#0000009d"
                                }
                              },
                              backgroundImage: `url(${photo.url})`,
                              backgroundSize: "cover",
                            }}
                            >
                              <Box sx={{
                                height: "100%",
                                width: "100%",
                              }} className="overlay">
                              </Box>
                              {index === 0 &&
                                <Box sx={{
                                  position: "absolute",
                                  bottom: "0",
                                  left: "0",
                                  padding: "5px",
                                  bgcolor: theme.palette.primary.main,
                                  borderRadius: "3px"
                                }}
                                >
                                  <Typography className="principal" variant="body2">
                                    Principal
                                  </Typography>
                                </Box>}
                              <a onClick={() => handleDeleteButton(photo)}>
                                <DeleteForeverIcon id="delete-icon" color="primary" sx={{
                                  cursor: "pointer",
                                  display: "none",
                                  fontSize: "40px",
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  marginRight: "-50%",
                                  transform: "translate(-50%, -50%)",
                                }} />
                              </a>
                            </Box>

                          )
                        })}

                      </Box>
                    </CustomDiv>
                  </Paper>

                  <Paper sx={{
                    padding: theme.spacing(3),
                    bgcolor: theme.palette.background.white,
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
                        error={Boolean(errors.description)}
                      />
                      <FormHelperText error={Boolean(errors.description)}>{errors.description}</FormHelperText>
                    </Box>
                  </Paper>

                  <Paper sx={{
                    padding: theme.spacing(3),
                    margin: theme.spacing(3, 0),
                    bgcolor: theme.palette.background.white,
                  }}>
                    <FormControl error={Boolean(errors.price)} variant="standard" fullWidth>
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
                      />
                      <FormHelperText>{errors.price}</FormHelperText>
                    </FormControl>
                  </Paper>

                  <Paper sx={{
                    padding: theme.spacing(3),
                    bgcolor: theme.palette.background.white,
                    margin: theme.spacing(3, 0),
                  }}>

                    <CustomDiv>
                      <Typography fontWeight={600} component="h3" variant="body1">
                        Dados de Contato
                      </Typography>
                      <FormControl error={Boolean(errors.name)} fullWidth variant="standard">
                        <Input
                          size="small"
                          placeholder="Nome"
                          value={values.name}
                          onChange={handleChange}
                          id="name"
                          name="name"
                        />
                        <FormHelperText>{errors.name}</FormHelperText>
                      </FormControl>
                    </CustomDiv>
                    <CustomDiv>
                      <FormControl error={Boolean(errors.email)} fullWidth variant="standard">
                        <Input
                          size="small"
                          placeholder="E-mail"
                          value={values.email}
                          onChange={handleChange}
                          id="email"
                          name="email"
                        />
                        <FormHelperText>{errors.email}</FormHelperText>
                      </FormControl>
                    </CustomDiv>
                    <CustomDiv>
                      <FormControl error={Boolean(errors.tel)} fullWidth variant="standard">
                        <Input
                          size="small"
                          placeholder="Telefone"
                          value={values.tel}
                          onChange={handleChange}
                          id="tel"
                          name="tel"
                        />
                        <FormHelperText>{errors.tel}</FormHelperText>
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