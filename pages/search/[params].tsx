import { Box, Container, Typography, useTheme } from "@mui/material"
import { NextPage } from "next"
import { GetServerSideProps } from "next/types"
import ProductCard from "../../src/components/ProductCard"
import SearchField from "../../src/components/SearchField"
import DefaultTemplate from "../../src/templates/Default"
import ProductsModel from "../../src/models/products.model"
import { ProductsDB } from "../user/dashboard"
import diacriticSensitiveRegex from "../../src/utils/caseregex"
import slugify from "slugify";
import Link from "next/link"


const SearchPage: NextPage<ProductsDB> = ({ products }) => {
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
            {`Encontrado ${products.length} anúncio(s)`}
          </Typography>
        </Box>
        <Box
          sx={{
            mt: "20px",
            display: "grid",
            gridTemplateColumns: {
              sm: "repeat(3, minmax(250px, 1fr))",
            },
            gap: theme.spacing(4)
          }}
        >
          {
            products.map((product, index) => {
              const category = slugify(product.category)
              const productTitle = slugify(product.title)
              return (
                <Link
                  href={`/${category}/${productTitle}/${product._id}`}
                  key={index}
                  passHref
                  style={{ textDecoration: "none" }}>
                  <ProductCard
                    title={product.title}
                    description={product.description}
                    image={`/uploads/${product.files[0].name}`}
                    price={product.price}
                  />
                </Link>
              )
            })
          }
        </Box>
      </Container>
    </DefaultTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx.query

  const products = await ProductsModel.find({
    $or: [
      {
        title: {
          $regex: diacriticSensitiveRegex(`${params}`),
          $options: "i",
        },
      },
      {
        description: {
          $regex: diacriticSensitiveRegex(`${params}`),
          $options: "i"
        }
      }]
  })

  return ({
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  })
}

export default SearchPage