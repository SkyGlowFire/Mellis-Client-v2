import { makeStyles } from '@mui/styles';
import { Container, Grid, Typography, Button, Theme } from '@mui/material';
import Shipment from './Shipment';
import Payment from './Payment';
import ItemCard from './ItemCard';
import { useAppSelector } from '~/app/hooks';
import { CreateOrderDto } from '~/app/dto/createOrder.dto';
import { useCreateOrderMutation } from '~/app/api';
import { useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
import { clearCart } from '~/cart/cartSlice';

const useStyles = makeStyles<Theme>((theme) => ({
  side: {
    height: '100%',
    backgroundColor: theme.palette.success.light,
  },
  main: {
    borderRight: `1px solid ${theme.palette.grey['100']}`,
    paddingTop: '2rem',
    minHeight: '100vh',
  },
  mainContent: {
    height: '100%',
    paddingBottom: '2rem',
  },
  sideContent: {
    color: theme.palette.text.primary,
    padding: '0 1.5rem',
  },
  count: {
    padding: '.2rem .5rem',
    backgroundColor: theme.palette.info.light,
    display: 'inline-block',
  },
}));

const Checkout = () => {
  const classes = useStyles();
  const { address, paymentMethod, totalPrice, items } = useAppSelector(
    (state) => state.cart
  );
  const [createOrder, { isSuccess }] = useCreateOrderMutation();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    if (!address) return;
    const newOrder: CreateOrderDto = {
      items: items.map((cartItem) => {
        return {
          ...cartItem,
          title: cartItem.product.title,
          color: cartItem.product.color,
          product: cartItem.product._id,
        };
      }),
      address: address._id,
      price: totalPrice,
    };
    createOrder(newOrder);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCart());
      history.push('/profile/orders');
    }
  }, [isSuccess, history, dispatch]);

  return items.length === 0 ? (
    <Redirect to="/cart" />
  ) : (
    <Grid container>
      <Grid item xs={12} lg={7} className={classes.main}>
        <div className={classes.mainContent}>
          <Container maxWidth="md">
            <Shipment />
            {address && <Payment />}
            {paymentMethod && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={items.length === 0}
                onClick={onSubmit}
              >
                Make order
              </Button>
            )}
          </Container>
        </div>
      </Grid>
      <Grid item xs={12} lg={5}>
        <div className={classes.side}>
          <Container
            maxWidth="md"
            style={{ paddingTop: '3rem' }}
            className={classes.sideContent}
          >
            <Grid
              container
              justifyContent="space-between"
              style={{ marginBottom: '.5rem' }}
            >
              <Grid item>
                <Typography color="inherit" variant="body2">
                  Sub-total
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="inherit" variant="body2">
                  ${totalPrice}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              style={{ marginBottom: '1.5rem' }}
            >
              <Grid item>
                <Typography color="inherit" variant="body2">
                  Delivery
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="inherit" variant="body2">
                  $0
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              style={{ marginBottom: '1rem' }}
            >
              <Grid item>
                <Typography color="inherit" variant="body1">
                  Total with tax
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="inherit" variant="body1">
                  ${totalPrice}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              style={{ marginBottom: '1rem' }}
            >
              <Grid item style={{ marginRight: '1rem' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  Your order
                </Typography>
              </Grid>
              <Grid item className={classes.count}>
                <span>
                  {items.length} {items.length > 1 ? 'items' : 'item'}
                </span>
              </Grid>
            </Grid>
            {items.map((item) => (
              <ItemCard item={item} key={item.id} />
            ))}
          </Container>
        </div>
      </Grid>
    </Grid>
  );
};

export default Checkout;
