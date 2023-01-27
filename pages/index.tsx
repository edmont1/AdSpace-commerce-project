import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme
} from "@mui/material"
import { NextPage } from "next"
import DefaultTemplate from "../src/templates/Default"
import ProductCard from "../src/components/ProductCard"
import SearchField from "../src/components/SearchField"

const Home: NextPage = () => {
  const theme = useTheme()
  return (
    <DefaultTemplate>
      <Container maxWidth="sm" >
        <Typography component="h1" variant="h3" align="center" sx={{
          pb: theme.spacing(6)
        }}>
          Busque um produto
        </Typography>
        <SearchField />
        <Typography align="center" variant="h4" component="h2" sx={{
          margin: theme.spacing(6, 0, 4, 0)
        }}>
          Produtos em destaque
        </Typography>
      </Container>

      <Container maxWidth="md">
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: theme.spacing(4)
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