import ProductCard from '~/common/components/cards/ProductCard';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { IProduct } from '~/types/products';
import { FC, useCallback } from 'react';
import { useAppDispatch } from '~/app/hooks';
import { setSearchText } from '~/common/state/mainSlice';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    // minHeight: 400,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 15,
    gridAutoRows: 280,
    marginBottom: '2rem',
    [theme.breakpoints.up('sm')]: {
      gap: 20,
      gridAutoRows: 420,
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridAutoRows: 380,
    },
    [theme.breakpoints.up('lg')]: {
      gridAutoRows: 560,
    },
  },
  cardItem: {
    marginBottom: 20,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },
}));

interface MainContentProps {
  products: IProduct[];
}

const MainContent: FC<MainContentProps> = ({ products }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(() => {
    dispatch(setSearchText(''));
  }, [dispatch]);

  return (
    <div className={classes.root}>
      {products.map((product) => (
        <div className={classes.cardItem} key={product._id}>
          <ProductCard product={product} onClick={clickHandler} />
        </div>
      ))}
    </div>
  );
};

export default MainContent;
