import { Typography, Button } from '@mui/material';
import AddressCard from './AddressCard';
import { selectAddress } from '~/cart/cartSlice';
import AddressForm, { AddressFormProps } from '~/common/components/AddressForm';
import { openAddressModal } from '~/common/state/mainSlice';
import { useEffect } from 'react';
import { useAddAddressMutation } from '~/app/api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';

const Shipment = () => {
  const dispatch = useAppDispatch();
  const [addAdress] = useAddAddressMutation();
  const { user } = useAppSelector((state) => state.auth);
  const onSubmit: AddressFormProps['onSubmit'] = (data) => {
    addAdress(data);
  };

  useEffect(() => {
    dispatch(selectAddress(null));
  }, [dispatch]);

  return (
    <>
      <Typography variant="h5" sx={{ mb: '1rem' }}>
        Delivery address
      </Typography>
      {!user || user.addresses.length === 0 ? (
        <AddressForm onSubmit={onSubmit} />
      ) : (
        <>
          {user &&
            user.addresses.map((address) => (
              <AddressCard address={address} key={address._id} />
            ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(openAddressModal())}
            style={{ marginBottom: '2rem' }}
          >
            Add new address
          </Button>
        </>
      )}
    </>
  );
};

export default Shipment;
