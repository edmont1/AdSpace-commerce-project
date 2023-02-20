import { Box, Button, Container, Typography, useTheme } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import ProductCard from "../../src/components/ProductCard"
import DefaultTemplate from "../../src/templates/Default"
import { useSession } from 'next-auth/react'
import { useEffect } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import ProductsModel from "../../src/models/products.model"
import dbConnect from "../../src/lib/dbConnect"
import Link from "next/link"


export interface ProductsDB {
  products: ProductDB[]
}

export interface ProductDB{
  _id: string
  title: string,
  category: string,
  files: any[],
  description: string,
  price: string,
  user: {
    name: string,
    email: string,
    tel: string
    id: string
  }
}

const Home: NextPage<ProductsDB> = ({ products }) => {
  const theme = useTheme()

  useEffect(() => {
    const nextDiv: any = document.querySelector("#__next")
    nextDiv.parentElement.style.paddingBottom = "14rem"
  }, [])

  async function handleRemove(productId: string) {
    console.log(productId)
  }

  return (
    <DefaultTemplate>
      <Container maxWidth="sm" sx={{
        pb: theme.spacing(7),
        textAlign: "center"
      }}>
        <Typography align="center" component="h1" variant="h3" >
          Meus Anúncios
        </Typography>
        <Link href={"/user/publish"} passHref legacyBehavior>
          <Button sx={{
            margin: "30px 0",
            fontWeight: "700"
          }}
            variant="contained"
          >
            Publicar novo anúncio
          </Button>
        </Link>
      </Container>

      <Container maxWidth="md" sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: theme.spacing(4)
      }}
      >
        {
          products.map((product, index) => (
            <ProductCard key={index}
              title={product.title}
              description={product.description}
              buttons={[
                  <Button key={0} size="small">Editar</Button>,
                  <Button key={1} sx={{m: "0 !important"}} size="small" onClick={() => handleRemove(product._id)}>Remover</Button>,
                  <Link key={2} href={`/product/${product._id}`} passHref legacyBehavior>
                    <Button size="small">Ver mais</Button>
                  </Link>
              ]}
              image={`/uploads/${product.files[0].name}`}
            />
          ))
        }
      </Container>

    </DefaultTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  const { id: userId } = session?.user as { id: string }
  await dbConnect()
  const products = await ProductsModel.find({ "user.id": userId })
  return ({
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  })
}

export default Home
