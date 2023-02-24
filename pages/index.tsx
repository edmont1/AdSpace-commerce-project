import {
  Box,
  Container,
  Typography,
  useTheme
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import DefaultTemplate from "../src/templates/Default"
import ProductCard from "../src/components/ProductCard"
import SearchField from "../src/components/SearchField"
import ProductsModel from "../src/models/products.model"
import { ProductsDB } from "./user/dashboard"
import Link from "next/link"
import slugify from "slugify"
import dbConnect from "../src/lib/dbConnect"



const Home: NextPage<ProductsDB> = ({ products }) => {
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
          {
            products.map((product, index) => {
              const category = slugify(product.category)
              const productTitle = slugify(product.title)

              return (
                <Link href={`/${category.toLocaleLowerCase()}/${productTitle.toLocaleLowerCase()}/${product._id}`} key={index} passHref style={{ textDecoration: "none" }}>
                  <ProductCard
                    image={`/uploads/${product.files[0].name}`}
                    title={product.title}
                    description={product.description}
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

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect()
  const products = await ProductsModel.aggregate([{
    $sample: { size: 6 }
  }])


  return ({
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  })
}

export default Home