import { 
  Box,
  Button,
  Container, 
  Input, 
  NativeSelect, 
  Paper,
  TextField, 
  Theme,
  useTheme,
  styled,
  Typography, 
  } from "@mui/material"
import { NextPage } from "next/types"
import DefaultTemplate from "../../src/templates/Default"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useState } from "react"
import {MouseEvent} from "react"

import {useDropzone} from 'react-dropzone'

declare module "@mui/material"{
  interface TypeBackground{
    white: string
  }
}

const CustomDiv = styled("div")(({theme}) => `
  padding-bottom: ${theme.spacing(3)};
`)

const Publish:NextPage = () => {
  const theme = useTheme() as Theme

  const [files, setFiles] = useState<any []>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg"]

    },
    maxFiles: 3,
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => (
        Object.assign(file, {
          url: URL.createObjectURL(file)

        })
      ))
      setFiles([...files, ...newFiles])
    }
  })

  function handleDeleteButton(photo:{url: string}){
    const filterFiles = files.filter((file) => file.url !== photo.url)
    setFiles(filterFiles)
  }
  
  return(
    <DefaultTemplate>
      <Container maxWidth="sm" sx={{
          padding: theme.spacing(10, 0, 6),
        }}>
          <Typography align="center" component="h1" variant="h3" >
            Publicar Anúncio
          </Typography>
          <Typography align="center" component="h2" variant="h5" >
            Publicar Anúncio
          </Typography>
        </Container>

        <Container maxWidth="md">
          <Paper sx={{
            padding: theme.spacing(3, 3, 0, 3),
            bgcolor: theme.palette.background.white,
            margin: theme.spacing(3, 0)
            }}>
            <CustomDiv>
              <Typography fontWeight={600} component="h3" variant="body1">
                Título do anúncio
              </Typography>
              <Input sx={{mt: "10px"}} size="small" fullWidth placeholder="ex.:Computador"/>
            </CustomDiv>

            <CustomDiv>
              <Typography fontWeight={600} component="h3" variant="body1">
                Categoria
              </Typography>
              <NativeSelect
                onChange={()=>{}}
                fullWidth
                defaultValue={0}
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
              >
                <option disabled value={0} >Selecione</option>
                <option value={20}>Option 1</option>
                <option value={30}>Option 2</option>
                <option value={30}>Option 3</option>
                <option value={30}>Option 4</option>
                <option value={30}>Option 5</option>
                <option value={30}>Option 6</option>
                <option value={30}>Option 7</option>
                <option value={30}>Option 8</option>
                <option value={30}>Option 9</option>
                <option value={30}>Option 10</option>
                <option value={30}>Option 11</option>
                <option value={30}>Option 12</option>
                <option value={30}>Option 13</option>
                <option value={30}>Option 14</option>
              </NativeSelect>
            </CustomDiv>
          </Paper>

          <Paper sx={{
            padding: theme.spacing(3, 3, 0, 3),
            bgcolor: theme.palette.background.white,
            margin: theme.spacing(3, 0)
            }}>
            <CustomDiv>
              <Typography fontWeight={600} component={"h4"} variant="body1">
                Imagens
              </Typography>
              <Typography sx={{mb: "10px"}} component="p" variant="body2">
                A primeira imagem é a foto principal do anúncio.
              </Typography>
              <Box sx={{
                display: "grid",
                gridTemplateColumns: "24% 24% 24% 24%",
                justifyContent: "space-between",
                gap: "20px 0"
                }}>
                
                <Box {...getRootProps()} sx={{
                  cursor: "pointer",
                  border: "2px dashed grey",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "10px",
                  height: "150px"
                  }} >
                  <input {...getInputProps()} type="text" />
                  <Typography variant="body1" sx={{
                    color: "grey"
                  }}>
                    Clique para adicionar ou arraste a imagem até aqui.
                  </Typography>
                </Box>
      
                
                {files.map((photo, index) => {return (

                  <Box key={index} sx={{
                    display: "flex",
                    height: "150px",
                    position: "relative",
                    "&:hover":{
                      "#delete-icon":{
                        display: "block"
                      },
                      ".overlay":{
                        bgcolor: "#0000009d"
                      }
                    },
                    backgroundImage: `url(${photo.url})`,
                    backgroundSize: "cover"
                    }}  
                    >
                    <Box sx={{
                        height: "100%",
                        width: "100%",
                        position: "relative"
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

                )})}
                
              </Box>
            </CustomDiv>
          </Paper>

          <Paper sx={{
            padding: theme.spacing(3, 3, 0, 3),
            bgcolor: theme.palette.background.white,
            margin: theme.spacing(3, 0)
            }}>
            <CustomDiv>
              <Typography fontWeight={600} component="h3" variant="body1">
                Descrição
              </Typography>
              <Typography component="p" variant="body2">
                Descreva em detalhes o produto à venda
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                fullWidth
                sx={{mt: "10px"}}
              />
            </CustomDiv>
            
          </Paper>

          <Paper sx={{
            padding: theme.spacing(3, 3, 0, 3),
            bgcolor: theme.palette.background.white,
            margin: theme.spacing(3, 0)
            }}>
            <CustomDiv>
              <Typography fontWeight={600} component="h3" variant="body1">
                Dados de Contato
              </Typography>
              <Input sx={{ mb:theme.spacing(3) }} size="small" fullWidth placeholder="Nome"/>
              <Input sx={{ mb:theme.spacing(3) }} size="small" fullWidth placeholder="E-mail"/>
              <Input sx={{ mb:"10px" }} size="small" fullWidth placeholder="Telefone"/>
            </CustomDiv>
            
          </Paper>

          <Box textAlign="right">
            <Button sx={{fontWeight: 600, color: theme.palette.primary.contrastText}} variant="contained">
              Publicar Anúncio
            </Button>
          </Box>
        </Container>
    </DefaultTemplate>
  )
}

export default Publish