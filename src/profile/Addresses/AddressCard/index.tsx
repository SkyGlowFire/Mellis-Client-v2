import { Typography, Link, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { openAddressModal } from '~/common/state/mainSlice';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Address } from '~/types/user';
import { FC } from 'react';
import { useAppDispatch } from '~/app/hooks';
import { useDeleteAddressMutation } from '~/app/api';

const useStyles = makeStyles({
  root: {
    border: '1px solid black',
    marginBottom: '1rem',
    padding: '.5rem 1rem',
    maxWidth: 600,
    position: 'relative',
  },
});

interface AddressCardProps {
  address: Address;
}

const AddressCard: FC<AddressCardProps> = ({ address }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const {
    firstName,
    lastName,
    streetName,
    city,
    streetNumber,
    phone,
    zip,
    apartment,
  } = address;
  const [deleteAddress] = useDeleteAddressMutation();

  const editBtnHandler = () => {
    dispatch(openAddressModal(address));
  };

  const deleteBtnHandler = () => {
    deleteAddress(address._id);
  };

  return (
    <div className={classes.root}>
      <IconButton
        size="small"
        sx={{ position: 'absolute', top: 10, right: 10 }}
        color="secondary"
        onClick={deleteBtnHandler}
      >
        <HighlightOffIcon fontSize="small" />
      </IconButton>
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
        underline="hover"
      >
        Edit
      </Link>
    </div>
  );
};

export default AddressCard;
