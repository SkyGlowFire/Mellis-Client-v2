import { Grid, Typography, Checkbox, Link } from '@mui/material';
import { selectAddress } from '~/cart/cartSlice';
import { makeStyles } from '@mui/styles';
import { openAddressModal } from '~/common/state/mainSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { Address } from '~/types/user';
import { FC } from 'react';

const useStyles = makeStyles({
  root: {
    border: '1px solid black',
    marginBottom: '1rem',
    padding: '.5rem 1rem',
    maxWidth: 500,
  },
});

interface AddresCardProps {
  address: Address;
}

const AddressCard: FC<AddresCardProps> = ({ address }) => {
  const classes = useStyles();
  const { address: selectedAddress } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const {
    firstName,
    lastName,
    apartment,
    city,
    streetName,
    phone,
    zip,
    streetNumber,
  } = address;
  const editBtnHandler = () => {
    dispatch(openAddressModal(address));
  };
  return (
    <Grid container className={classes.root} alignItems="center">
      <Grid item xs>
        <Typography variant="body1">
          {firstName} {lastName}
        </Typography>
        <Typography variant="body2" style={{ fontSize: '.8rem' }}>
          {streetName}, {streetNumber}, {apartment && `${apartment},`} {zip},{' '}
          {city}
        </Typography>
        <Typography
          variant="body2"
          style={{ fontSize: '.8rem', marginBottom: '1rem' }}
        >
          phone: {phone || 'No phone'}
        </Typography>
        <Link
          style={{ fontWeight: 'bold' }}
          color="inherit"
          onClick={editBtnHandler}
        >
          Edit
        </Link>
      </Grid>
      <Grid item xs={1} container justifyContent="center">
        <Checkbox
          checked={selectedAddress?._id === address._id}
          onChange={() => dispatch(selectAddress(address))}
        />
      </Grid>
    </Grid>
  );
};

export default AddressCard;
