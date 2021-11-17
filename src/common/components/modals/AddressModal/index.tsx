import { Dialog, Container, DialogContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { closeAddressModal } from '~/common/state/mainSlice';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import {
  ErrorResponse,
  useAddAddressMutation,
  useUpdateAddressMutation,
} from '~/app/api';
import AddressForm, { AddressFormProps } from '~/common/components/AddressForm';
import { setAlert } from '~/alerts/alertSlice';

const useStyles = makeStyles({
  root: {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'unset',
  },
});

const AddressModal = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { address, open } = useAppSelector((state) => state.main.addressModal);
  const [addAddress] = useAddAddressMutation();
  const [updateAddress, { error, isSuccess }] = useUpdateAddressMutation();

  const handleClose = useCallback(() => {
    dispatch(closeAddressModal());
  }, [dispatch]);

  useEffect(() => {
    if (error && 'status' in error) {
      const errorData = error.data as ErrorResponse;
      dispatch(setAlert(errorData.message, 'error'));
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  const onSubmit: AddressFormProps['onSubmit'] = useCallback(
    (data) => {
      if (!address) {
        addAddress(data);
      } else {
        updateAddress({ id: address._id, data });
      }
    },
    [address, addAddress, updateAddress]
  );

  return (
    <Dialog
      onClose={handleClose}
      fullWidth
      open={open}
      scroll="body"
      className={classes.root}
      maxWidth="md"
    >
      <DialogContent>
        <Container maxWidth="sm" style={{ marginTop: '1rem' }}>
          <Typography
            gutterBottom
            variant="h5"
            style={{ marginBottom: '2rem' }}
          >
            Delivery address
          </Typography>
          <AddressForm address={address} onSubmit={onSubmit} />
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
