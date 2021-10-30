import {
  Dialog,
  Link as MuiLink,
  Button,
  Typography,
  Avatar,
  DialogContent,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { closeCartItemModal, closeLookModal } from '~/common/state/mainSlice';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'unset',
  },
  main: {
    position: 'relative',
    paddingBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '70%',
  },
  check: {
    color: theme.palette.success.main,
    backgroundColor: theme.palette.grey['200'],
    padding: '1rem',
    marginBottom: '1rem',
  },
  image: {
    width: 200,
    marginBottom: '1.5rem',
  },
  link: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '.8rem',
  },
}));

const CartItemModal: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { open, item } = useAppSelector((state) => state.main.cartItemModal);
  const closeHandler = () => {
    dispatch(closeCartItemModal());
  };
  const goToCartHandler = () => {
    dispatch(closeCartItemModal());
    dispatch(closeLookModal());
  };
  return (
    <Dialog
      onClose={closeHandler}
      fullWidth
      open={open}
      scroll="body"
      className={classes.root}
      maxWidth="sm"
    >
      <DialogContent classes={{ root: classes.main }}>
        {item && (
          <div className={classes.content}>
            <Avatar className={classes.check}>
              <CheckIcon />
            </Avatar>
            <Typography
              variant="h6"
              color="textPrimary"
              align="center"
              style={{ marginBottom: '1rem' }}
            >
              Product has been added to cart
            </Typography>
            <Typography color="textPrimary" variant="body2">
              {item.product.title} - size <b>{item.size}</b>
            </Typography>
            <Typography color="textPrimary" gutterBottom variant="body2">
              ${item.price}
            </Typography>
            <img
              src={item.product.image.url}
              className={classes.image}
              alt=""
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginBottom: '1rem' }}
              component={Link}
              to="/cart"
              onClick={goToCartHandler}
            >
              Go to Cart
            </Button>
          </div>
        )}

        <MuiLink
          color="textPrimary"
          className={classes.link}
          onClick={closeHandler}
          underline="hover"
        >
          Proceed with shopping
        </MuiLink>
      </DialogContent>
    </Dialog>
  );
};

export default CartItemModal;
