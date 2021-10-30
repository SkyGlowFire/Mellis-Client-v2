import { makeStyles } from '@mui/styles';
import { Typography, Grid, Theme } from '@mui/material';
import ItemCard from '../ItemCard';
import { useAppSelector } from '~/app/hooks';
import { FC } from 'react';
import HoverBox from '~/common/components/HoverBox/HoverBox';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    padding: '1rem',
    width: 240,
    minHeight: 200,
    [theme.breakpoints.up('md')]: {
      width: 300,
    },
    overflow: 'hidden',
  },
  container: {
    overflowY: 'auto',
    maxHeight: 300,
    [theme.breakpoints.up('md')]: {
      maxHeight: 400,
    },
    paddingRight: '1.2rem',
    width: '100%',
  },
  btn: {
    display: 'inline-block',
    padding: '.2rem 1rem',
    borderRadius: '.2rem',
  },
}));

interface CartBoxProps {
  onClose: () => void;
}

const CartBox: FC<CartBoxProps> = ({ onClose }) => {
  const classes = useStyles();
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: '1rem' }}
      >
        <Grid item>
          <HoverBox
            dark
            color="primary"
            type="link"
            to="/cart"
            className={classes.btn}
            onClick={onClose}
          >
            My cart
          </HoverBox>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            Total price: ${totalPrice}
          </Typography>
        </Grid>
      </Grid>
      {items.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          Cart is empty
        </Typography>
      ) : (
        <div className={classes.container}>
          {items.slice(0, 3).map((item) => (
            <ItemCard product={item.product} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartBox;
