import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme
} from '@mui/material'
import { ReactNode } from 'react';
import { formatCurrency } from '../utils/currency';


interface Props {
  title: string,
  description: string,
  buttons?: ReactNode[],
  image?: string
  price: string
  userAd?: boolean
}
const ProductCard = ({ title, description, buttons, image, price, userAd }: Props) => {
  const theme = useTheme()
  return (
    <Card sx={{ bgcolor: theme.palette.background.paper }}>
      <CardMedia
        sx={{
          height: 280,
          backgroundSize: "cover",
          position: "relative"
        }}
        image={image}
        title={title}
      >
        {
          userAd &&
          <Box sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            bgcolor: theme.palette.primary.main,
            p: "5px",
            borderRadius: "3px",
            fontSize: "12px",
            color: theme.palette.text.primary,
            fontWeight: "700"
          }}>
            Meu anúncio
          </Box>
        }
      </CardMedia>
      <CardContent sx={{
        color: theme.palette.text.primary,
        pb: "15px !important",
        height: "200px"
      }}>
        <Typography gutterBottom variant="h5" component="div">
          {title.length > 25 ? title.slice(0, 25) + "..." : title}
        </Typography>
        <Typography gutterBottom sx={{ color: theme.palette.text.primary, pb: "20px" }} variant="body2" color="text.secondary">
          {description.length > 32 ? description.slice(0, 32) + "..." : description}
        </Typography>
        <Typography sx={{ color: theme.palette.text.primary, fontWeight: 700 }} variant="h6" color="text.secondary">
          {formatCurrency(+price)}
        </Typography>
      </CardContent>

      {
        buttons ?
          <CardActions sx={{
            display: "flex",
            justifyContent: "center",
            "& > a": {
              m: "0 !important"
            }
          }}>
            {buttons}
          </CardActions>
          :
          null
      }
    </Card>
  );
}

export default ProductCard