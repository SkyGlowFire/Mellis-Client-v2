import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { withStyles } from '@mui/styles';
import { FC } from 'react';
import { useAppSelector } from '~/app/hooks';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 2px',
  },
}))(Badge);

const CartIcon: FC = (props) => {
  const count = useAppSelector((state) => state.cart.items.length);
  return (
    <StyledBadge badgeContent={count} color="secondary">
      <ShoppingCartIcon {...props} />
    </StyledBadge>
  );
};

export default CartIcon;
