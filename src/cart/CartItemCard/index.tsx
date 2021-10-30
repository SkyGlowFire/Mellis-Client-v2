import { Grid, Typography, Theme, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem, removeCartItem } from '~/cart/cartSlice';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { useAppDispatch } from '~/app/hooks';
import MainInfo from './MainInfo';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    padding: '.5rem 0',
    minHeight: 240,
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.grey['300']}`,
    },
    '&:last-child': {
      marginBottom: `2rem`,
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: 260,
    },
  },
  image: {
    width: 150,
    height: '100%',
    backgroundSize: 'cover',
  },
  removeBtn: {
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));

interface CartItemProps {
  item: CartItem;
}

const CartItemCard: FC<CartItemProps> = ({ item }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item>
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
        justifyContent="space-between"
      >
        <Grid item>
          <IconButton
            size="small"
            onClick={() => dispatch(removeCartItem(item.id))}
            className={classes.removeBtn}
            title="Remove item"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography color="textPrimary">${item.price}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItemCard;
