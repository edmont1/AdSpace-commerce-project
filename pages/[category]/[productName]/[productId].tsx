import {
  Avatar,
  Box,
  Chip,
  Container,
  Paper,
  Typography,
  useTheme
} from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import Carousel from "react-material-ui-carousel"
import dbConnect from "../../../src/lib/dbConnect"
import ProductsModel from "../../../src/models/products.model"
import DefaultTemplate from "../../../src/templates/Default"
import { ProductDB } from "../../user/dashboard"
import Image from "next/image"
import { formatCurrency } from "../../../src/utils/currency"



const Product: NextPage<{ product: ProductDB }> = ({ product }) => {
  const theme = useTheme()

  return (
    <DefaultTemplate>
      <Container sx={{
        display: "grid",
        gridTemplateColumns: {
          md: "66% 32%",
          xs: "100%"
        },
        gridTemplateRows: "auto",
        justifyContent: "space-between"
      }}>

        <Box>
          <Paper
            sx={{
              p: theme.spacing(3),
              mb: theme.spacing(3)
            }}>
            <Carousel swipe={false} autoPlay={false} animation="slide">
              {
                product?.files.map((file, index) => (
                  // <Box key={index} height="500px">
                  //   <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={`/uploads/${file.name}`} alt="" />
                  // </Box>
                  <Box key={index} sx={{ height: "500px", position: "relative" }}>
                    <Image loading="eager" priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw" fill style={{ objectFit: "contain" }} src={`/uploads/${file.name}`} alt="" />
                  </Box>
                ))
              }
            </Carousel>
          </Paper>

          <Paper
            sx={{
              p: theme.spacing(3),
              mb: theme.spacing(3)
            }}>
            <Typography component="span" variant="caption" fontSize={12}>
              {`Publicado em ${product?.date.day} às ${product?.date.time.slice(0, 5)}`}
            </Typography>
            <Typography component="h1" variant="h4"
              sx={{
                p: theme.spacing(2, 0, 1, 0)
              }}
            >
              {product?.title}
            </Typography>
            <Typography sx={{ mb: theme.spacing(3) }} component="h2" variant="h4" fontWeight={700}>
              {formatCurrency(+product?.price)}
            </Typography>
            <Chip label={product?.category} />
          </Paper>

          <Paper
            sx={{
              p: theme.spacing(3),
              mb: theme.spacing(3)
            }}>
            <Typography component="p" fontWeight={700}>
              Descrição
            </Typography>
            <Typography component="p">
              {product?.description}
            </Typography>
          </Paper>
        </Box>

        <Box>
          <Paper
            sx={{
              p: theme.spacing(4),
              display: "flex",
              alignItems: "center",
              mb: theme.spacing(3)
            }}>
            <Avatar alt={`${product?.user.name}`} src={`${product?.user.image}`} />
            <Box sx={{ ml: theme.spacing(2) }}>
              <Typography component="p">{product?.user.name}</Typography>
              <Typography color="grey" component="p" variant="subtitle2">{product?.user.email}</Typography>
            </Box>
          </Paper>

          <Paper
            sx={{
              alignSelf: "start",
              p: theme.spacing(4),
              mb: theme.spacing(3)
            }}
          >
            <Typography component="h3" fontWeight={700}>
              Localização
            </Typography>
            <Typography component="h3">
              {
                product?.localization.cep &&
                `Cep: ${product?.localization.cep}`
              }
            </Typography>
            <Typography component="h3" >
              {
                product?.localization.rua &&
                `Rua: ${product?.localization.rua}`
              }
            </Typography>
            <Typography component="h3" >
              {
                product?.localization.bairro &&
                `Bairro: ${product?.localization.bairro}`
              }
            </Typography>
            <Typography component="h3" >
              {`Cidade: ${product?.localization.cidade}`}
            </Typography>
            <Typography component="h3" >
              {`Estado: ${product?.localization.estado}`}
            </Typography>
          </Paper>
          <Paper
            sx={{
              p: theme.spacing(4),
              mb: theme.spacing(3),
              display: "flex"
            }}
          >
            <Typography component="h3" fontWeight={700}>
              {`Telefone:`}
            </Typography>
            <Typography component="h3" sx={{pl: theme.spacing(0.5)}}>
              {`${product?.user.tel}`}
            </Typography>
          </Paper>
        </Box>

      </Container>
    </DefaultTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productId = ctx.query.productId
  await dbConnect()
  const product: ProductDB | null = await ProductsModel.findOne({ _id: productId })
  return ({
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  })
}

export default Product