import { 
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography, 
  useTheme} from '@mui/material'
import { ReactNode } from 'react';


interface Props{
  title: string,
  description: string,
  buttons?: ReactNode [],
  image?: string
}
const ProductCard = ({ title, description, buttons, image }:Props) => {
  const theme = useTheme()
  return (
    <Card sx={{bgcolor: theme.palette.background.paper}}>
      <CardMedia
        sx={{ 
          height: 200,
          backgroundSize: "cover"}}
        image={image}
        title={title}
      />
      <CardContent sx={{color: theme.palette.text.primary}}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{color: theme.palette.text.primary}} variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {
        buttons? 
        <CardActions sx={{
          display: "flex", 
          justifyContent: "center",
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