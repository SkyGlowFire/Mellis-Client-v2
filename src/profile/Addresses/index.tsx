import AddressForm, { AddressFormProps } from '~/common/components/AddressForm';
import { makeStyles } from '@mui/styles';
import { Typography, Button, Theme } from '@mui/material';
import AddressCard from './AddressCard';
import { openAddressModal } from '~/common/state/mainSlice';
import { useAddAddressMutation, useGetAddressesQuery } from '~/app/api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';

const useStyles = makeStyles<Theme>((theme) => ({
  items: {
    marginBottom: '2rem',
    maxWidth: 400,
    [theme.breakpoints.up('md')]: {
      maxWidth: 500,
    },
  },
  form: {
    maxWidth: 600,
    [theme.breakpoints.up('lg')]: {
      maxWidth: 800,
    },
  },
}));

const Addresses = () => {
  const classes = useStyles();
  const { data: addresses } = useGetAddressesQuery();
  const dispatch = useAppDispatch();
  const [addAddress] = useAddAddressMutation();

  const onSubmit: AddressFormProps['onSubmit'] = (data) => {
    addAddress(data);
  };

  return (
    <>
      {addresses && addresses.length === 0 ? (
        <>
          <Typography style={{ marginBottom: '1rem' }} variant="h5">
            Add new address
          </Typography>
          <div className={classes.form}>
            <AddressForm onSubmit={onSubmit} />
          </div>
        </>
      ) : (
        <div className={classes.items}>
          {addresses &&
            addresses.map((address) => <AddressCard address={address} />)}
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(openAddressModal())}
          >
            Add new address
          </Button>
        </div>
      )}
    </>
  );
};

export default Addresses;
