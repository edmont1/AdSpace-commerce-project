import { 
  Avatar, 
  Box, 
  Chip, 
  Container, 
  Paper, 
  Typography, 
  useTheme } from "@mui/material"
import { NextPage } from "next"
import Carousel from "react-material-ui-carousel"
import DefaultTemplate from "../../src/templates/Default"

const Product:NextPage = () => {
  const theme = useTheme()

  var items = [
    {
        name: "Random Name #1",
        description: "https://source.unsplash.com/random"
    },
    {
        name: "Random Name #2",
        description: "https://source.unsplash.com/random"
    }
  ]


  return(
    <DefaultTemplate>
      <Container sx={{
        display: "grid",
        gridTemplateColumns:{
          md: "66% 32%",
          xs: "100%"
        },
        gridTemplateRows: "auto",
        justifyContent: "space-between"
      }}>

        <Box>
          <Paper 
          sx={{
            p: theme.spacing(3),
            mb: theme.spacing(3)
          }}>
            <Carousel autoPlay={false} animation="slide">
              {
                items.map((item, index) => (
                  <Box key={index} height="500px">
                    <img style={{width: "100%", height: "100%", objectFit: "cover"}} src={item.description} alt="" />
                  </Box>
                ))
              }
            </Carousel>
          </Paper>
          
          <Paper 
          sx={{
            p: theme.spacing(3),
            mb: theme.spacing(3)
          }}>
            <Typography component="span" variant="caption" fontSize={12}>
              Publicado em 17/01/2023
            </Typography>
            <Typography component="h1" variant="h4"
            sx={{
              p: theme.spacing(2,0,1,0)
            }}
            >
              Nome do produto
            </Typography>
            <Typography sx={{mb: theme.spacing(3)}} component="h2" variant="h4" fontWeight={700}>
              R$20.000,00
            </Typography>
            <Chip label="Categoria" />
          </Paper>

          <Paper 
          sx={{
            p: theme.spacing(3),
            mb: theme.spacing(3)
          }}>
            <Typography component="p" fontWeight={700}>
              Descrição
            </Typography>
            <Typography component="p">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque deserunt, explicabo porro voluptatem nostrum in asperiores assumenda tempora placeat numquam? Fugiat reiciendis repudiandae quod vero! Dolor exercitationem at neque modi!
            </Typography>
          </Paper>
        </Box>

        <Box>
          <Paper 
          sx={{
            p: theme.spacing(4),
            display: "flex",
            alignItems: "center",
            mb: theme.spacing(3)
          }}>
            <Avatar alt="Eduardo" src="#" />
            <Box sx={{ml: theme.spacing(2)}}>
              <Typography component="p">Eduardo</Typography>
              <Typography color="grey" component="p" variant="subtitle2">ed_hsmo@hotmail.com</Typography>
            </Box>
          </Paper>
      
          <Paper 
          sx={{
            alignSelf: "start",
            p: theme.spacing(4),
            mb: theme.spacing(3)
          }}
          >
            <Typography component="h3" fontWeight={700}>
                Localização
            </Typography>
          </Paper>
        </Box>
        
      </Container>
    </DefaultTemplate>
  )
}

export default Product