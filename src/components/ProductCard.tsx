import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface Props{
  title: string,
  price?: number,
  description: string
}
const ProductCard = ({title, price, description}:Props) => {
  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardMedia
        sx={{ 
          height: 200 }}
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