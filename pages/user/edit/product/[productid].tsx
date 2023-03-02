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

import DefaultTemplate from "../../../../src/templates/Default"
import { FormValues, validationSchema } from "../../../../src/utils/publishpage/formValues"
import { CustomDiv } from "../../../../styles/publish.style"

import { Formik } from "formik"
import UploadFiles from "../../../../src/components/UploadFiles"
import Titles from "../../../../src/templates/Titles"
import { useRouter } from "next/router"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../api/auth/[...nextauth]"
import useToasty from "../../../../src/contexts/Toasty"
import { useState } from "react"
import dbConnect from "../../../../src/lib/dbConnect"
import ProductsModel from "../../../../src/models/products.model"
import { ProductDB } from "../../dashboard"


interface ProductProps {
  product: ProductDB
}

interface ValuesWithDate extends FormValues {
  time: string,
  day: string
}

const EditProduct: NextPage<ProductProps> = ({ product }) => {
  const theme = useTheme()
  const router = useRouter()
  const { setToasty } = useToasty()

  const [cepHelperText, setCepHelperText] = useState("")

  function getFormData(product: ProductDB) {
    //passing the content of product to form format (formvalues.x)
    const formValues = {
      ...product.user,
      ...product.localization,
      ...product.date,
      ...product
    } as FormValues

    for (let field in formValues) {
      if (field === "user" || field === "localization" || field === "date") {
        delete formValues[field]
      }
    }

    return formValues
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

    const filesValuesArray = [
      ...values.files
    ]

    //file is sended to put with body only if they have a name
    //this prevents that new add files is sended without a name and update the database
    const filesValuesArrayToSend = filesValuesArray.filter(file => file.hasOwnProperty("name"))

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
    formData.append("filesremaining", JSON.stringify(filesValuesArrayToSend))

    fetch(`/api/products`, {
      method: "PUT",
      body: formData
    })
      .then((res) => {
        res.json().then((data) => {
          setToasty({
            open: true,
            severity: "success",
            autoHide: 2000,
            message: "Anúncio editado com sucesso"
          })
          setTimeout(() => {
            router.push("/user/dashboard")
          }, 2000)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <DefaultTemplate>
      <Titles title="Editar Anúncio" subtitle="Editar Anúncio" />

      <Formik
        initialValues={getFormData(product)}
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
                        Localização
                      </Typography>
                      <FormControl error={Boolean(errors.cep && touched.cep || cepHelperText)} fullWidth variant="standard">
                        <Input
                          size="small"
                          placeholder="Cep (apenas números)"
                          value={values.cep}
                          onBlur={() => getCep(values.cep)}
                          onChange={handleChange}
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
                    </CustomDiv>
                    <CustomDiv>
                      <FormControl error={Boolean(errors.rua && touched.rua)} fullWidth variant="standard">
                        <Input
                          autoComplete="none"
                          size="small"
                          placeholder="Rua"
                          value={values.rua}
                          onChange={handleChange}
                          onBlur={handleChange}
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
                        {
                          errors.rua && touched.rua &&
                          <FormHelperText>{errors.rua}</FormHelperText>
                        }
                      </FormControl>
                    </CustomDiv>
                    <CustomDiv>
                      <FormControl error={Boolean(errors.bairro && touched.bairro)} fullWidth variant="standard">
                        <Input
                          autoComplete="none"
                          size="small"
                          placeholder="Bairro"
                          value={values.bairro}
                          onChange={handleChange}
                          onBlur={handleChange}
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
                        {
                          errors.bairro && touched.bairro &&
                          <FormHelperText>{errors.bairro}</FormHelperText>
                        }
                      </FormControl>
                    </CustomDiv>
                    <CustomDiv>
                      <FormControl error={Boolean(errors.cidade && touched.cidade)} fullWidth variant="standard">
                        <Input
                          autoComplete="none"
                          size="small"
                          placeholder="Cidade"
                          value={values.cidade}
                          onChange={handleChange}
                          onBlur={handleChange}
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
                          errors.cidade && touched.cidade &&
                          <FormHelperText>{errors.cidade}</FormHelperText>
                        }
                      </FormControl>
                    </CustomDiv>
                    <CustomDiv>
                      <FormControl error={Boolean(errors.estado && touched.estado)} fullWidth variant="standard">
                        <Input
                          autoComplete="none"
                          size="small"
                          placeholder="Estado"
                          value={values.estado}
                          onChange={handleChange}
                          onBlur={handleChange}
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
                          errors.estado && touched.estado &&
                          <FormHelperText>{errors.estado}</FormHelperText>
                        }
                      </FormControl>
                    </CustomDiv>
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
                      Editar Anúncio
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
  let idMatch = false
  const productId = ctx.query.productid
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  await dbConnect()
  const product = await ProductsModel.findOne({ _id: productId }) as ProductDB
  const { id } = session?.user as { id: string }
  if (product?.user.id === id) {
    idMatch = true
  }
  return (idMatch ?
    {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      }
    }
    :
    {
      redirect: {
        permanent: false,
        destination: "/user/dashboard"
      }
    }
  )
}

export default EditProduct