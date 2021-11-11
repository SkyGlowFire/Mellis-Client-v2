import { Button, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { IProduct } from '~/types/products';

const useStyles = makeStyles<Theme>({
  bestsellerCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 .2rem',
    alignItems: 'flex-start',
    height: '100%',
  },
  cardImage: {
    // height: '18vw',
    // maxHeight: 250,
    width: '100%',
    backgroundPosition: 'center 0',
    backgroundSize: 'cover',
    marginBottom: '.5rem',
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
  },
  imageTag: {
    position: 'absolute',
    color: '#fff',
    backgroundColor: 'black',
    top: 20,
    right: -25,
    transform: 'rotate(45deg)',
    zIndex: 10,
    display: 'block',
    padding: '.2rem 1.5rem',
  },
  shopBtn: {
    padding: '0 .5rem',
    textTransform: 'none',
  },
});

interface BestsellerProps {
  product: IProduct;
}

const Bestseller: FC<BestsellerProps> = ({ product }) => {
  const classes = useStyles();
  return (
    <div className={classes.bestsellerCard}>
      <div
        className={classes.cardImage}
        style={{ backgroundImage: `url(${product.image.url})` }}
      >
        <span className={classes.imageTag}>bestseller</span>
      </div>
      <Typography
        variant="body1"
        style={{ fontSize: '.9rem', fontWeight: 'bold' }}
        gutterBottom
      >
        {product.title}
      </Typography>
      <Typography variant="body2" style={{ fontSize: '.8rem' }} gutterBottom>
        ${product.comparePrice || product.price}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.shopBtn}
        component={Link}
        to={`/product/${product._id}`}
      >
        Shop now
      </Button>
    </div>
  );
};

export default Bestseller;
