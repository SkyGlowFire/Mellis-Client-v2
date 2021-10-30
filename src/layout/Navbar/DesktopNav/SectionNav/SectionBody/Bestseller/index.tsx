import { Button, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { FC } from 'react';

const useStyles = makeStyles<Theme>({
  bestsellerCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 .2rem',
    alignItems: 'flex-start',
  },
  cardImage: {
    height: '18vw',
    maxHeight: 250,
    width: '100%',
    backgroundPosition: 'center 0',
    backgroundSize: 'cover',
    marginBottom: '.5rem',
  },
  shopBtn: {
    padding: '0 .5rem',
    textTransform: 'none',
  },
});

const Bestseller: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.bestsellerCard}>
      <div
        className={classes.cardImage}
        style={{ backgroundImage: `url(/images/card-1.jpg)` }}
      />
      <Typography
        variant="body1"
        style={{ fontSize: '.9rem', fontWeight: 'bold' }}
        gutterBottom
      >
        Longan sky jacket
      </Typography>
      <Typography variant="body2" style={{ fontSize: '.8rem' }} gutterBottom>
        $55
      </Typography>
      <Button variant="contained" color="primary" className={classes.shopBtn}>
        Shop now
      </Button>
    </div>
  );
};

export default Bestseller;
