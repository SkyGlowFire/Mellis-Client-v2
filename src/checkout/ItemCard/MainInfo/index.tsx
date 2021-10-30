import { Grid, Typography } from '@mui/material';
import { CartItem } from '~/cart/cartSlice';
import { FC } from 'react';

interface MainInfoProps {
  item: CartItem;
}

const MainInfo: FC<MainInfoProps> = ({ item }) => {
  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <Grid item xs={1} />
      <Grid item>
        <Typography variant="subtitle1" color="textPrimary">
          {item.product.title}
          {item.qty > 1 && `, ${item.qty} items`}
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
        <Typography
          variant="body2"
          sx={{ fontSize: '.8rem' }}
          color="textPrimary"
        >
          Size: {item.size}
        </Typography>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default MainInfo;
