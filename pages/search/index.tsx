import { Box, Container, Typography, useTheme } from "@mui/material";
import { NextPage } from "next";
import ProductCard from "../../src/components/ProductCard";
import SearchField from "../../src/components/SearchField";
import DefaultTemplate from "../../src/templates/Default";

const SearchPage: NextPage = () => {
  const theme = useTheme()

  return (
    <DefaultTemplate>
      <Container maxWidth="sm">
        <SearchField />
      </Container>

      <Container maxWidth="md"
        sx={{
          mt: theme.spacing(6),
        }}
      >
        <Box textAlign="center">
          <Typography fontWeight={700} component="h1" variant="h5">
            Anúncios
          </Typography>
          <Typography component="h2" variant="subtitle2">
            Encontrados 100 anúncios
          </Typography>
        </Box>
        <Box
          sx={{
            mt: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: theme.spacing(4)
          }}
        >
          <ProductCard
            title="Titulo do card"
            description="R$40,00"
            image="https://uploads.spiritfanfiction.com/historias/capas/201608/uma-historia-totalmente-aleatoria-interativa-6353447-300820162245.jpg"
          />
          <ProductCard
            title="Titulo do card"
            description="R$40,00"
            image="https://uploads.spiritfanfiction.com/historias/capas/201608/uma-historia-totalmente-aleatoria-interativa-6353447-300820162245.jpg"
          />
          <ProductCard
            title="Titulo do card"
            description="R$40,00"
            image="https://uploads.spiritfanfiction.com/historias/capas/201608/uma-historia-totalmente-aleatoria-interativa-6353447-300820162245.jpg"
          />
          <ProductCard
            title="Titulo do card"
            description="R$40,00"
            image="https://uploads.spiritfanfiction.com/historias/capas/201608/uma-historia-totalmente-aleatoria-interativa-6353447-300820162245.jpg"
          />
        </Box>
      </Container>
    </DefaultTemplate>
  )
}

export default SearchPage