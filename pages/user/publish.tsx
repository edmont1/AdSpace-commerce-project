import { 
  Box,
  Button,
  Container, 
  Input, 
  NativeSelect, 
  Paper, 
  styled, 
  TextField, 
  Typography, 
  useTheme } from "@mui/material"
import { NextPage } from "next/types"
import DefaultTemplate from "../../src/templates/Default"

declare module "@mui/material"{
  interface TypeBackground{
    white: string
  }
}

const Publish:NextPage = () => {
  const theme = useTheme()

  const CustomDiv = styled("div")(() => ({
    paddingBottom: theme.spacing(3)
  }))
  
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
              <Typography fontWeight={600} component="h3" variant="body1">
                Imagens
              </Typography>
              <Typography component="p" variant="body2">
                A primeira imagem é a foto principal.
              </Typography>
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