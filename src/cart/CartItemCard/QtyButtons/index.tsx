import { Typography, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartItem, decreaseCartItem, increaseCartItem } from '~/cart/cartSlice';
import { FC } from 'react';
import { useAppDispatch } from '~/app/hooks';

interface QtyButtonsProps {
  item: CartItem;
}

const QtyButtons: FC<QtyButtonsProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        size="small"
        onClick={() => dispatch(decreaseCartItem(item.id))}
        disabled={item.qty === 1}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography color="textPrimary" sx={{ mx: '10px' }}>
        {item.qty || 0}
      </Typography>
      <IconButton
        size="small"
        onClick={() => dispatch(increaseCartItem(item.id))}
        disabled={item.qty >= 10}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default QtyButtons;
