import { 
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography } from '@mui/material'

interface Props{
  title: string,
  price?: number,
  description: string
}
const ProductCard = ({title, price, description}:Props) => {
  return (
    <Card sx={{
      maxWidth: {
        sm: "260px",
        }}}>
      <CardMedia
        sx={{ 
          height: 200,
          backgroundSize: "cover"}}
        image="http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png"
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
      <CardActions>
        <Button size="small">Editar</Button>
        <Button size="small">Remover</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard