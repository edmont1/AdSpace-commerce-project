import { useTheme } from "@emotion/react"
import { Button, Container, Theme, Typography } from "@mui/material"
import { NextPage } from "next"
import ProductCard from "../../src/components/ProductCard"
import DefaultTemplate from "../../src/templates/Default"


const Home:NextPage = () => {
  const theme = useTheme() as Theme
  return (
    <DefaultTemplate>
      <Container maxWidth="sm" sx={{
        padding: theme.spacing(10, 0, 6),
      }}>
        <Typography align="center" component="h1" variant="h2" >
          Meus Anuncios
        </Typography>
        <Button sx={{
          margin: "30px auto",
          display: "block"
        }} 
          variant="contained"
          >
          Publicar novo anúncio
        </Button>
      </Container>
      
      <Container maxWidth="md">
        <ProductCard title="Lizard" description="Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica." />
      </Container>
    </DefaultTemplate>
  )
}

export default Home
