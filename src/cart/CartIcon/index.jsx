import {useSelector} from 'react-redux'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import {withStyles} from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 3,
      top: 8,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 2px',
    },
  }))(Badge);

const CartIcon = (props) => {
    const count = useSelector(state => state.cart.count)
    return ( 
        <StyledBadge badgeContent={count} color='secondary'>
            <ShoppingCartIcon {...props}/>
        </StyledBadge>
     );
}
 
export default CartIcon;