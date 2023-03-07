import { Box, Container, Typography, useTheme } from "@mui/material"
import { NextPage } from "next"
import { GetServerSideProps } from "next/types"
import ProductCard from "../../src/components/ProductCard"
import SearchField from "../../src/components/SearchField"
import DefaultTemplate from "../../src/templates/Default"
import ProductsModel from "../../src/models/products.model"
import { ProductsDB } from "../user/dashboard"
import diacriticSensitiveRegex from "../../src/utils/diacriticsensitive"
import slugify from "slugify";
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"

interface Props extends ProductsDB {
  userId: string
}
const SearchPage: NextPage<Props> = ({ products, userId }) => {
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
            Resultado
          </Typography>
          <Typography component="h2" variant="subtitle2">
            {`Encontrado ${products.length} anúncio(s)`}
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
          {
            products.map((product, index) => {
              const category = slugify(product.category).toLowerCase()
              const productTitle = slugify(product.title).toLowerCase()

              if (product.user.id === userId) {
                return (
                  <Link
                    href={`/${category.toLowerCase()}/${productTitle.toLowerCase()}/${product._id}`}
                    key={index}
                    passHref
                    style={{ textDecoration: "none" }}>
                    <Box sx={{ position: "relative" }}>
                      <ProductCard
                        image={`https://storage.googleapis.com/ad-space/uploads/${product._id}/${product.files[0].name}`}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        userAd={true}
                      />
                    </Box>
                  </Link>
                )
              }
              return (
                <Link
                  href={`/${category}/${productTitle}/${product._id}`}
                  key={index}
                  passHref
                  style={{ textDecoration: "none" }}>
                  <ProductCard
                    title={product.title}
                    description={product.description}
                    image={`https://storage.googleapis.com/ad-space/uploads/${product._id}/${product.files[0].name}`}
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
  let userId
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
      },
    ]
  })

  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (session) {
    const { id } = session.user as { id: string }
    userId = id
  }

  return ({
    props: {
      products: JSON.parse(JSON.stringify(products)),
      ...userId &&
      {
        userId
      }
    }
  })
}

export default SearchPage