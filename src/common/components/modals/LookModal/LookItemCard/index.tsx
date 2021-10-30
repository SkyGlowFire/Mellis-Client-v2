import { makeStyles } from '@mui/styles';
import { Typography, Button, Theme } from '@mui/material';
import { useState, useEffect, FC } from 'react';
import Select from '~/common/components/form-inputs/Select';
import { addCartItem } from '~/cart/cartSlice';
import { useAppDispatch } from '~/app/hooks';
import { IProduct, Size } from '~/types/products';

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

interface LookItemCardProps {
  product: IProduct;
}

const LookItemCard: FC<LookItemCardProps> = ({ product }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [size, setSize] = useState<Size | ''>('');

  useEffect(() => {
    setSize(product.sizes[0]);
  }, [product]);

  const addBtnHandler = () => {
    dispatch(addCartItem({ product: product, size: size as Size }));
  };

  return (
    <div className={classes.root}>
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${product.image.url})` }}
      ></div>
      <Typography variant="body2" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        ${product.price}
      </Typography>
      <Typography variant="body2" gutterBottom color="textSecondary">
        color: {product.color}
      </Typography>
      <Select
        value={size}
        onChange={(val) => setSize(val)}
        options={product.sizes}
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
  );
};

export default LookItemCard;
