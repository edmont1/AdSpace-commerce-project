import { 
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography, 
  useTheme} from '@mui/material'
import { ReactNode } from 'react';
import { formatCurrency } from '../utils/currency';


interface Props{
  title: string,
  description: string,
  buttons?: ReactNode [],
  image?: string
  price: string
}
const ProductCard = ({ title, description, buttons, image, price }:Props) => {
  const theme = useTheme()
  return (
    <Card sx={{bgcolor: theme.palette.background.paper}}>
      <CardMedia
        sx={{ 
          height: 200,
          backgroundSize: "cover",
        }}
        image={image}
        title={title}
      />
      <CardContent sx={{
        color: theme.palette.text.primary,
        pb: "15px !important"  
        }}>
        <Typography gutterBottom variant="h5" component="div">
          {title.length > 18 ? title.slice(0, 18) + "..." : title}
        </Typography>
        <Typography gutterBottom sx={{color: theme.palette.text.primary, pb: "20px"}} variant="body2" color="text.secondary">
          {description.length > 32 ? description.slice(0, 32) + "..." : description}
        </Typography>
        <Typography sx={{color: theme.palette.text.primary, fontWeight:700}} variant="h6" color="text.secondary">
          {formatCurrency(+price)}
        </Typography>
      </CardContent>

      {
        buttons? 
        <CardActions sx={{
          display: "flex", 
          justifyContent: "center",
          "& > a" : {
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