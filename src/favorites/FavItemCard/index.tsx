import { makeStyles } from '@mui/styles';
import { Typography, Button, IconButton, Theme } from '@mui/material';
import { useState, useEffect, FC } from 'react';
import Select from '~/common/components/form-inputs/Select';
import { addCartItem } from '~/cart/cartSlice';
import { FavItem, removeFavItem } from '../favoritesSlice';
import { useAppDispatch } from '~/app/hooks';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Transition } from 'react-transition-group';
import { Size } from '~/types/products';

const duration = { appear: 300, exit: 300, enter: 300 };

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  image: {
    backgroundPosition: 'center 10%',
    flex: '1',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '10px 10px 0 0',
    marginBottom: '1rem',
    position: 'relative',
  },
  deleteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.grey['300'],
    },
  },
}));

const defaultStyle = {
  transition: `opacity ${duration.enter}ms ease-in-out, transform ${duration.exit}ms ease-in-out`,
  opacity: 1,
  transform: 'scale(1)',
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { transform: 'scale(0)' },
  exited: { transform: 'scale(0)' },
  unmounted: {},
};

interface FavItemCardProps {
  item: FavItem;
}

const FavItemCard: FC<FavItemCardProps> = ({ item }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(true);
  const [size, setSize] = useState<Size | ''>('');

  useEffect(() => {
    setSize(item.product.sizes[0]);
  }, [item]);

  const addBtnHandler = () => {
    dispatch(addCartItem({ product: item.product, size: size as Size }));
  };
  const deleteBtnHandler = () => {
    setShow(false);
  };

  return (
    <Transition
      appear={true}
      timeout={duration}
      in={show}
      onExited={() => dispatch(removeFavItem(item.id))}
    >
      {(state) => (
        <div
          className={classes.root}
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${item.product.image.url})` }}
          >
            <IconButton
              size="small"
              className={classes.deleteBtn}
              onClick={deleteBtnHandler}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </div>
          <Typography variant="body2" gutterBottom>
            {item.product.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            ${item.product.price}
          </Typography>
          <Typography variant="body2" gutterBottom color="textSecondary">
            color: {item.product.color}
          </Typography>
          <Select
            value={size}
            onChange={(val) => setSize(val)}
            options={item.product.sizes}
            variant="outlined"
            style={{ marginBottom: '.5rem' }}
          />
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={addBtnHandler}
          >
            Add to cart
          </Button>
        </div>
      )}
    </Transition>
  );
};

export default FavItemCard;
