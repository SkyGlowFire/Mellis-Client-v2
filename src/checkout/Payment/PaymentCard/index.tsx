import { Typography, Grid, SvgIcon, Checkbox } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { PaymentMethod } from '../index';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { selectPaymentMethod } from '~/cart/cartSlice';

const useStyles = makeStyles({
  root: {
    padding: '1rem',
    border: '1px solid black',
    marginBottom: '.5rem',
    cursor: 'pointer',
    '&:hover': {
      border: '2px solid black',
    },
  },
});

interface PaymentCardProps {
  method: PaymentMethod;
}

const PaymentCard: FC<PaymentCardProps> = ({ method }) => {
  const classes = useStyles();
  const { label, name, icons } = method;
  const { paymentMethod } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(selectPaymentMethod(name));
  };

  return (
    <Grid
      container
      className={classes.root}
      alignItems="center"
      onClick={clickHandler}
    >
      <Grid item xs={2}>
        <Checkbox checked={paymentMethod === name} />
      </Grid>
      <Grid item xs={3}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs container spacing={2}>
        {icons.map((icon, idx) => (
          <Grid item key={`paymenticon-${idx}`}>
            <SvgIcon
              component={icon}
              viewBox="0 0 780 500"
              style={{ fontSize: '3rem' }}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default PaymentCard;
