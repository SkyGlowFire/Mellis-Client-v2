import { Grid, Typography, Box } from '@mui/material';
import { useCallback, ChangeEvent, FC } from 'react';
import { CartItem, changeCartItemSize } from '~/cart/cartSlice';
import { useAppDispatch } from '~/app/hooks';
import { Size } from '~/types/products';
import QtyButtons from '../QtyButtons';
import MuiNativeSelect from '~/common/components/form-inputs/NativeSelect';

interface MainInfoProps {
  item: CartItem;
}

const MainInfo: FC<MainInfoProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const changeSizeHandler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(
        changeCartItemSize({ id: item.id, size: e.target.value as Size })
      );
    },
    [item, dispatch]
  );

  return (
    <Grid container direction="column" sx={{ height: '100%', pt: '16px' }}>
      <Grid item>
        <Typography variant="subtitle1" color="textPrimary">
          {item.product.title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="body2"
          sx={{ fontSize: '.8rem' }}
          color="textPrimary"
        >
          Color: {item.product.color}
        </Typography>
      </Grid>

      <Grid item>
        <Box display="flex" alignItems="center">
          <Typography
            variant="body2"
            sx={{ fontSize: '.8rem', mr: '10px' }}
            color="textPrimary"
          >
            Size:{' '}
          </Typography>
          <MuiNativeSelect
            name="size"
            value={item.size}
            options={item.product.sizes}
            onChange={changeSizeHandler}
          />
        </Box>
      </Grid>
      <Grid item xs></Grid>
      <Grid item>
        <QtyButtons item={item} />
      </Grid>
    </Grid>
  );
};

export default MainInfo;
