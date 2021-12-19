import ProductCard from '~/common/components/cards/ProductCard';
import LookCard from '~/common/components/cards/LookCard';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import clsx from 'clsx';
import { IProduct } from '~/types/products';
import { FC, useState, useEffect } from 'react';
import { getRandomArrElem } from '~/utils/helperMethods';
import { ILook } from '~/types/looks';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    minHeight: 400,
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
  vertical: {
    [theme.breakpoints.up('sm')]: {
      gridRow: 'auto / span 2',
    },
  },
  lookItem: {
    gridColumnEnd: 'span 2',
  },
}));

interface MainContentProps {
  products: IProduct[];
}

interface ProductItem {
  type: 'product';
  data: IProduct;
}

interface LookItem {
  type: 'look';
  data: ILook;
}

type Item = LookItem | ProductItem;

const MainContent: FC<MainContentProps> = ({ products }) => {
  const classes = useStyles();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    console.log('products', products);
    const newItems: Item[] = [];
    let lookCounter = 0; //look render frequency
    const addedLooks: string[] = []; // avoid look repeat
    products.forEach((product) => {
      lookCounter++;
      if (lookCounter >= 2 && product.looks?.length > 0) {
        const randomLook = getRandomArrElem(product.looks);
        if (addedLooks.includes(randomLook._id)) {
          newItems.push({ type: 'product', data: product });
        } else {
          if (lookCounter % 2 !== 0) {
            newItems.push({ type: 'look', data: randomLook });
            newItems.push({ type: 'product', data: product });
          } else {
            newItems.push({ type: 'product', data: product });
            newItems.push({ type: 'look', data: randomLook });
          }
          addedLooks.push(randomLook._id);
          lookCounter = 0;
        }
      } else {
        newItems.push({ type: 'product', data: product });
      }
    });
    setItems(newItems);
  }, [products]);

  return (
    <div className={classes.root}>
      {items.map((item) =>
        item.type === 'product' ? (
          <div className={classes.cardItem} key={item.data._id}>
            <ProductCard product={item.data} />
          </div>
        ) : (
          <div
            className={clsx({
              [classes.vertical]: item.data.orientation === 'vertical',
              [classes.cardItem]: true,
              [classes.lookItem]: true,
            })}
            key={item.data._id}
          >
            <LookCard look={item.data} />
          </div>
        )
      )}
    </div>
  );
};

export default MainContent;
