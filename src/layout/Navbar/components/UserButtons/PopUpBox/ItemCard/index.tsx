import { makeStyles } from '@mui/styles';
import { Typography, Theme } from '@mui/material';
import { FC } from 'react';
import { IProduct, IProductPopulated } from '~/types/products';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: 240,
    [theme.breakpoints.up('md')]: {
      height: 360,
    },
    marginBottom: '1rem',
  },
  image: {
    backgroundPosition: 'center 20%',
    flex: '1',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '10px 10px 0 0',
    marginBottom: '.5rem',
    position: 'relative',
  },
}));

interface ItemCardProps {
  product: IProduct | IProductPopulated;
}

const ItemCard: FC<ItemCardProps> = ({ product }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${product.image.url})` }}
      />
      <Typography variant="body2" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="body2" gutterBottom>
        ${product.price}
      </Typography>
    </div>
  );
};

export default ItemCard;
