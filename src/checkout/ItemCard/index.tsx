import { Grid, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { CartItem } from '~/cart/cartSlice';
import MainInfo from './MainInfo';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    padding: '.5rem 0',
    minHeight: 260,
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.grey['300']}`,
    },
    '&:last-child': {
      marginBottom: `2rem`,
    },
    maxWidth: 600,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
  },
}));

interface ItemCardProps {
  item: CartItem;
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={5} sm={4}>
        <div
          className={classes.image}
          style={{ backgroundImage: `url(${item.product.image.url})` }}
        />
      </Grid>
      <Grid item xs>
        <MainInfo item={item} />
      </Grid>
      <Grid
        item
        xs={2}
        container
        direction="column"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Grid item>
          <Typography
            color="textPrimary"
            variant="body2"
            style={{ fontSize: '.8rem' }}
          >
            ${item.price}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemCard;
