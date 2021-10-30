import { useState, FC } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import HoverBox from '~/common/components/HoverBox/HoverBox';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    marginBottom: '.5rem',
    flex: 1,
    backgroundSize: 'cover',
    transition: 'background-size .3s ease-in-out',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 15%',
  },
  tile: {
    textAlign: 'left',
  },
});

interface Item {
  img: string;
  text: string;
  price: number;
  id: string;
}

interface ItemCardprops {
  item: Item;
  className: string;
}

const ItemCard: FC<ItemCardprops> = ({ item, className }) => {
  const [active, setActive] = useState(false);
  const classes = useStyles();
  return (
    <Link
      to={`/product/${item.id}`}
      className={clsx(classes.root, className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div
        style={{ backgroundImage: `url(${item.img})` }}
        className={classes.image}
      />
      <div>
        <HoverBox active={active} color="info" style={{ textAlign: 'left' }}>
          {item.text}
        </HoverBox>
        <Typography variant="body2" color="textSecondary">
          ${item.price}
        </Typography>
      </div>
    </Link>
  );
};

export default ItemCard;
