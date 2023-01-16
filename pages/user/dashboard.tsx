import { Button, Container, Theme, Typography, useTheme } from "@mui/material"
import { NextPage } from "next"
import ProductCard from "../../src/components/ProductCard"
import DefaultTemplate from "../../src/templates/Default"


const Home:NextPage = () => {
  const theme = useTheme()



  const cardButtons = [
  <Button key={0} size="small">Editar</Button>, 
  <Button key={1} size="small">Remover</Button>]
  
  return (
    <DefaultTemplate>
      <Container maxWidth="sm" sx={{
        pb: theme.spacing(6),
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
        gap: theme.spacing(3, 0)
        }}>
        <ProductCard 
        title="Lizard" 
        description="Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica." 
        buttons={cardButtons}
        image="http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png"
        />
        <ProductCard 
        title="Lizard" 
        description="Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica."
        buttons={cardButtons}
         />
        <ProductCard title="Lizard" description="Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica." />
        <ProductCard title="Lizard" description="Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica." />
      </Container>

    </DefaultTemplate>
  )
}

export default Home
