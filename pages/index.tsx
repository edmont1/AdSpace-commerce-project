import {
  Box, 
  Container, 
  Paper, 
  Typography, 
  useTheme } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import { NextPage } from "next"
import DefaultTemplate from "../src/templates/Default"
import SearchIcon from "@mui/icons-material/Search"
import ProductCard from "../src/components/ProductCard"

const Home:NextPage = () => {
  const theme = useTheme()
  return(
    <DefaultTemplate>
      <Container maxWidth="sm" >
        <Typography component="h1" variant="h3" align="center" sx={{
          pb: "50px"
        }}>
          Busque um produto
        </Typography>
        <Paper sx={{
          padding: theme.spacing(0, 2),
          display:"flex",
          bgcolor: theme.palette.background.white
          }}>
          <InputBase placeholder="Ex.:iPhone, Computador, Notebook" fullWidth />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Paper>

        <Typography align="center" variant="h4" component="h2" sx={{
          margin: theme.spacing(6, 0, 4, 0)
        }}>
          Produtos em destaque
        </Typography>
      </Container>

      <Container maxWidth="md">
        <Box sx={{
          display: "grid",
          gridTemplateColumns: {
            sm: "50% 50%",
            md: "33.33% 33.33% 33.33%",
            xs: "100%",
          },
          justifyItems: "center",
          gap: theme.spacing(3, 0),
          }}>
          <ProductCard image="http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png" title="Produto1" description="R$100" />
          <ProductCard title="Produto1" description="R$100" />
          <ProductCard title="Produto1" description="R$100" />
          <ProductCard title="Produto1" description="R$100" />
        </Box>
      </Container>
    </DefaultTemplate>
  )
}

export default Home