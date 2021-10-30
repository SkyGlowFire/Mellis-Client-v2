import { makeStyles } from '@mui/styles';
import { Typography, Theme } from '@mui/material';
import ItemCard from '../ItemCard';
import { useAppSelector } from '~/app/hooks';
import { FC } from 'react';
import HoverBox from '~/common/components/HoverBox/HoverBox';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    padding: '1rem',
    width: 240,
    minHeight: 200,
    [theme.breakpoints.up('md')]: {
      width: 300,
    },
    overflow: 'hidden',
  },
  container: {
    overflowY: 'auto',
    maxHeight: 300,
    [theme.breakpoints.up('md')]: {
      maxHeight: 400,
    },
    paddingRight: '1.2rem',
    width: '100%',
  },
  btn: {
    display: 'inline-block',
    padding: '.2rem 1rem',
    borderRadius: '.2rem',
    marginBottom: '1rem',
  },
}));

interface FavoriteBoxProps {
  onClose: () => void;
}

const FavoriteBox: FC<FavoriteBoxProps> = ({ onClose }) => {
  const classes = useStyles();
  const { items } = useAppSelector((state) => state.favorites);
  return (
    <div className={classes.root}>
      <HoverBox
        dark
        color="primary"
        type="link"
        to="/favorites"
        className={classes.btn}
        onClick={onClose}
      >
        My favorites
      </HoverBox>
      {items.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No favorite items
        </Typography>
      ) : (
        <div className={classes.container}>
          {items.slice(0, 3).map((item) => (
            <ItemCard product={item.product} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteBox;
