import { Button, Container, Theme, Typography, useTheme } from "@mui/material"
import { NextPage } from "next"
import ProductCard from "../../src/components/ProductCard"
import DefaultTemplate from "../../src/templates/Default"


const Home:NextPage = () => {
  const theme = useTheme()
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
      
      <Container maxWidth="md" sx={{
        display: "grid",
        gridTemplateColumns: {
          md: "33.33% 33.33% 33.33%",
          sm:"50% 50%",
          xs: "100%"
        },
        justifyItems: "center",
        gap: "20px 0"
        }}>
        <ProductCard title="Lizard" description="Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica." />
        <ProductCard title="Lizard" description="Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica." />
        <ProductCard title="Lizard" description="Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica." />
        <ProductCard title="Lizard" description="Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica." />
      </Container>

    </DefaultTemplate>
  )
}

export default Home
