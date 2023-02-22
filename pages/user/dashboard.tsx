import {
  Button,
  Container,
  Typography,
  useTheme,
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import ProductCard from "../../src/components/ProductCard"
import DefaultTemplate from "../../src/templates/Default"
import { useEffect, useState } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import ProductsModel from "../../src/models/products.model"
import dbConnect from "../../src/lib/dbConnect"
import Link from "next/link"
import DialogComponent from "../../src/components/DialogComponent"
import useToasty from "../../src/contexts/Toasty"



export interface ProductsDB {
  products: ProductDB[]
}

export interface ProductDB {
  _id: string
  title: string,
  category: string,
  files: any[],
  description: string,
  price: string,
  date:{
    time: string,
    day: string
  }
  user: {
    name: string,
    email: string,
    tel: string
    id: string
  },
  localization:{
    cep: string
    rua: string
    bairro: string
    cidade: string
    estado: string
  }
}

const Home: NextPage<ProductsDB> = ({ products }) => {
  const theme = useTheme()

  const [openDialog, setOpenDialog] = useState(false);
  const [productId, setProductId] = useState<string>("")
  const [removedProducts, setRemovedProducts] = useState<string[]>([])
  const {setToasty} = useToasty()

  function handleCloseDialog(){
    setOpenDialog(false)
  }

  function handleClickRemove(productId: string) {
    setOpenDialog(true)
    setProductId(productId)
  }
  
  function handleConfirmDialog(){
    setOpenDialog(false)
    fetch(`/api/products/${productId}`, {
      method: "DELETE",
    })
    .then((res) => {
      res.json().then((data) => {
        setRemovedProducts([...removedProducts,productId])
        setToasty({
          open: true,
          severity: "success",
          message: "Anúncio deletado com sucesso",
          autoHide: 1000
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }


  return (
    <DefaultTemplate>
      <DialogComponent handleConfirmDialog={handleConfirmDialog} handleClose={handleCloseDialog} openDialog={openDialog} />
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
        {
          products.length === removedProducts.length &&
          <Typography align="center">
            Nenhum anúncio publicado
          </Typography>
        }
      </Container>

      <Container maxWidth="md" sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: theme.spacing(4)
      }}
      >
        {
          products.map((product, index) => {
            if(removedProducts.includes(product._id)) return null
            return (
              <ProductCard key={index}
                title={product.title}
                description={product.description}
                buttons={[
                  <Button key={0} size="small">Editar</Button>,
                  <Button key={1} sx={{ m: "0 !important" }} size="small" onClick={() => handleClickRemove(product._id)}>Remover</Button>,
                  <Link key={2} href={`/product/${product._id}`} passHref legacyBehavior>
                    <Button size="small">Ver mais</Button>
                  </Link>
                ]}
                image={`/uploads/${product.files[0].name}`}
              />
            )
          })
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
