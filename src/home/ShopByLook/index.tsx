import { useState } from 'react';
import { Grid, Typography, Container, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HoverBox from '~/common/components/HoverBox/HoverBox';
import ItemCard from './ItemCard';

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    maxWidth: 1600,
    marginBottom: '2rem',
  },
  root: {},
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  products: {
    display: 'flex',
    maxWidth: '100%',
    overflowX: 'auto',
    paddingBottom: '1rem',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
      height: '50vw',
      width: '100%',
      overflowY: 'auto',
      overflowX: 'hide',
      padding: '0 2rem 0 2rem',
    },
  },
  card: {
    minWidth: '50%',
    margin: '0 .5rem',
    height: '55vw',
    '&:first-child': {
      marginLeft: 0,
    },
    '&:last-child': {
      marginRight: 0,
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '32%',
      height: '45vw',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0 0 2rem 0',
      width: '100%',
      minWidth: 'none',
      minHeight: '80%',
      marginRight: 0,
      padding: 0,
    },
    [theme.breakpoints.up('lg')]: {
      margin: '0 0 2rem 0',
      width: '100%',
      minWidth: 'none',
      minHeight: 500,
      marginRight: 0,
      padding: 0,
    },
  },
  photo: {
    backgroundSize: 'cover',
    height: '65vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: '1rem',
    backgroundPosition: '0 20%',
    [theme.breakpoints.up('md')]: {
      height: '50vw',
    },
  },
  photoButtons: {
    marginBottom: '2rem',
    display: 'flex',
  },
  photoButton: {
    padding: '.7rem 1.5rem',
    border: 'none',
    outline: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
}));

const ShopByLook = () => {
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const classes = useStyles();
  const look = {
    female: {
      photo: '/images/women_look/main.webp',
      items: [
        {
          img: '/images/women_look/item-1.webp',
          text: 'Protest Nxg Dreamy Sweatshirt',
          price: 25.34,
          id: '61bc8c77115984cb79aa13eb',
        },
        {
          img: '/images/women_look/item-2.webp',
          text: 'Protest Nxg Rebelly Beanie',
          price: 14,
          id: '61bc8cd3115984cb79aa1400',
        },
      ],
    },
    male: {
      photo: '/images/men_look/main.webp',
      items: [
        {
          img: '/images/men_look/item-1.webp',
          text: 'Protest Nxg Kimchi Snapback',
          price: 7.5,
          id: '61bc8abf115984cb79aa13a2',
        },
        {
          img: '/images/men_look/item-2.webp',
          text: 'Nxg Lon sleeve shirt Brown',
          price: 12,
          id: '61bc8b8a115984cb79aa13bc',
        },
      ],
    },
  };
  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container alignItems="flex-end" style={{ marginBottom: '.5rem' }}>
        <Grid item xs>
          <Typography variant="h4" color="primary" className={classes.title}>
            Shop by look
          </Typography>
        </Grid>
        <Grid item sx={{ px: '0.5rem' }}>
          <HoverBox
            color="info"
            type="link"
            to={gender === 'female' ? '/category/women' : '/category/men'}
          >
            Shop {gender === 'female' ? 'women' : 'men'}
          </HoverBox>
        </Grid>
      </Grid>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={8}>
          <div
            className={classes.photo}
            style={{ backgroundImage: `url(${look[gender].photo})` }}
          >
            <div className={classes.photoButtons}>
              <HoverBox
                type="button"
                onClick={() => setGender('female')}
                className={classes.photoButton}
                variant="toLeft"
                color="primary"
                dark
                active={gender === 'female'}
              >
                Girls
              </HoverBox>
              <HoverBox
                dark
                type="button"
                onClick={() => setGender('male')}
                className={classes.photoButton}
                color="primary"
                active={gender === 'male'}
              >
                Boys
              </HoverBox>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.products}>
            {look[gender].items.map((item) => (
              <ItemCard item={item} className={classes.card} key={item.id} />
            ))}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopByLook;
