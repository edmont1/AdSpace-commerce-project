import { 
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography } from '@mui/material'
import { ReactNode } from 'react';

interface Props{
  title: string,
  description: string,
  buttons?: ReactNode [],
  image?: string
}
const ProductCard = ({title, description, buttons, image}:Props) => {
  return (
    <Card sx={{
      maxWidth: {
        sm: "260px",
        },
      width: {
        xs: "100%"
      }
      }}>
      <CardMedia
        sx={{ 
          height: 200,
          backgroundSize: "cover"}}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {
        buttons? 
        <CardActions>
        {buttons}
        </CardActions>
        :
        null
      }
    </Card>
  );
}

export default ProductCard