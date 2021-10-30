import { makeStyles } from '@mui/styles';
import { Typography, Grid, Theme } from '@mui/material';
import ProductCard from '~/common/components/cards/ProductCard';
import { IProductPopulated } from '~/types/products';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginBottom: '2rem',
  },
  cardItem: {
    height: '70vw',
    minHeight: 250,
    maxHeight: 700,
    [theme.breakpoints.up('sm')]: {
      height: '50vw',
    },
    [theme.breakpoints.up('md')]: {
      height: '42vw',
    },
    [theme.breakpoints.up('xl')]: {
      height: '36vw',
    },
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
}));

interface RelatedProductsProps {
  product: IProductPopulated;
}

const RelatedProducts: FC<RelatedProductsProps> = ({ product }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        className={classes.title}
      >
        This might interest you
      </Typography>
      <Grid container spacing={5}>
        {product.relatedProducts.map((product) => (
          <Grid item xs={6} sm={4} className={classes.cardItem}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RelatedProducts;
