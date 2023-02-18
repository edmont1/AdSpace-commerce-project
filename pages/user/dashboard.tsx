import { Button, Container, Typography, useTheme } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import ProductCard from "../../src/components/ProductCard"
import DefaultTemplate from "../../src/templates/Default"
import { useSession } from 'next-auth/react'
import { useEffect } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import ProductsModel from "../../src/models/products.model"
import dbConnect from "../../src/lib/dbConnect"


export interface ProductsDB{
  products:{
    title: string,
    category: string,
    files: any[],
    description: string,
    price: string,
    user:{
      name: string,
      email: string,
      tel: string
      id: string
    }
  }[]
}

const Home: NextPage<ProductsDB> = ({products}) => {
  const theme = useTheme()
  const {status} = useSession()

  useEffect(() => {
    const nextDiv: any = document.querySelector("#__next")
    nextDiv.parentElement.style.paddingBottom = "14rem"
  }, [status])

  function handleRemove(){

  }

  const cardButtons = [
    <Button key={0} size="small">Editar</Button>,
    <Button key={1} size="small" onClick={handleRemove}>Remover</Button>
  ]

  return (
    <DefaultTemplate>
      <Container maxWidth="sm" sx={{
        pb: theme.spacing(7),
      }}>
        <Typography align="center" component="h1" variant="h3" >
          Meus Anúncios
        </Typography>
        <Button sx={{
          margin: "30px auto",
          display: "block",
          fontWeight: "700"
        }}
          variant="contained"
        >
          Publicar novo anúncio
        </Button>
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
            buttons={cardButtons}
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
  const {id:userId} = session?.user as {id: string}
  await dbConnect()
  const products = await ProductsModel.find({"user.id": userId})
  return({
    props:{
      products: JSON.parse(JSON.stringify(products))
    }
  })
}

export default Home
