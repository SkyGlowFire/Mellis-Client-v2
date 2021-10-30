import { makeStyles } from '@mui/styles';
import {
  Container,
  Grid,
  Typography,
  Button,
  SvgIcon,
  Theme,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { ReactComponent as VisaIcon } from './images/visa.svg';
import { ReactComponent as PayPalIcon } from './images/paypal.svg';
import { ReactComponent as MaestroIcon } from './images/maestro.svg';
import { ReactComponent as MirIcon } from './images/mir.svg';
import { useAppSelector } from '~/app/hooks';
import CartItemCard from './CartItemCard';

const useStyles = makeStyles<Theme>((theme) => ({
  root: { minHeight: 600 },
  side: {
    backgroundColor: theme.palette.grey['100'],
    height: '100%',
    padding: '0 1rem',
  },
  main: {
    height: '100%',
    marginTop: '2rem',
    maxWidth: 700,
    [theme.breakpoints.up('md')]: {
      maxWidth: 900,
    },
  },
  count: {
    padding: '.2rem .5rem',
    backgroundColor: theme.palette.grey['300'],
    display: 'inline-block',
  },
  sideContent: {
    color: theme.palette.text.primary,
    paddingTop: '3rem',
    marginBottom: '2rem',
    maxWidth: 700,
  },
}));

const Cart = () => {
  const classes = useStyles();
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const history = useHistory();

  const checkoutBtnHandler = () => {
    history.push('/checkout');
  };

  return (
    <Grid container className={classes.root} alignItems="stretch">
      <Grid item xs={12} md={7}>
        <Container maxWidth={false} className={classes.main}>
          <Grid container alignItems="center" style={{ marginBottom: '1rem' }}>
            <Grid item style={{ marginRight: '1rem' }}>
              <Typography variant="h5" className={classes.title}>
                My Cart
              </Typography>
            </Grid>
            <Grid item className={classes.count}>
              <span>{items.length} items</span>
            </Grid>
          </Grid>
          {items.map((item) => (
            <CartItemCard item={item} key={item.id} />
          ))}
        </Container>
      </Grid>
      <Grid item xs={12} md={5}>
        <div className={classes.side}>
          <Container maxWidth={false} className={classes.sideContent}>
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginBottom: '1rem' }}
              onClick={checkoutBtnHandler}
              disabled={items.length === 0}
            >
              CHECKOUT
            </Button>
            <Typography color="inherit">We accept:</Typography>
            <Grid container spacing={1}>
              <Grid item>
                <SvgIcon
                  component={VisaIcon}
                  viewBox="0 0 780 500"
                  style={{ fontSize: '3rem' }}
                />
              </Grid>
              <Grid item>
                <SvgIcon
                  component={PayPalIcon}
                  viewBox="0 0 780 500"
                  style={{ fontSize: '3rem' }}
                />
              </Grid>
              <Grid item>
                <SvgIcon
                  component={MaestroIcon}
                  viewBox="0 0 780 500"
                  style={{ fontSize: '3rem' }}
                />
              </Grid>
              <Grid item>
                <SvgIcon
                  component={MirIcon}
                  viewBox="0 0 780 500"
                  style={{ fontSize: '3rem' }}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </Grid>
    </Grid>
  );
};

export default Cart;
