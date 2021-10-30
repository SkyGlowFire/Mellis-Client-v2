import { makeStyles } from '@mui/styles';
import { Typography, Grid, Container, Theme } from '@mui/material';
import { Link } from 'react-router-dom';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    backgroundColor: theme.palette.info.light,
    paddingTop: '1.5rem',
  },
  container: {
    maxWidth: 1600,
  },
  cardItem: {
    '&:nth-child(2)': {
      [theme.breakpoints.up('md')]: {
        paddingTop: '3rem',
      },
    },
    '&:hover': {
      '& $image': {
        filter: 'grayscale(0%)',
      },
    },
  },
  image: {
    height: '30vw',
    backgroundSize: 'cover',
    filter: 'grayscale(100%)',
  },
}));

const Collections: FC = () => {
  const collections = [
    {
      img: '/images/collections/collection_2.jpg',
      text: 'Women bikinis',
      href: 'women/swimwear/bikinis',
    },
    {
      img: '/images/collections/collection_3.jpg',
      text: 'Men costumes',
      href: 'men/outdoor_clothing/costumes',
    },
    {
      img: '/images/collections/collection_4.jpg',
      text: 'Men Jeans',
      href: 'men/outdoor_clothing/jeans',
    },
  ];
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth={false} className={classes.container}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Collection
        </Typography>
        <Typography
          color="primary"
          variant="subtitle1"
          align="center"
          style={{ marginBottom: '1rem' }}
        >
          Spring & Summer 2020/2021
        </Typography>
        <Grid container spacing={3} style={{ paddingBottom: '2rem' }}>
          {collections.map((item, idx) => (
            <Grid
              item
              xs={6}
              md={4}
              className={classes.cardItem}
              key={item.text}
            >
              {idx % 2 === 0 ? (
                <Link to={`/category/${item.href}`}>
                  <div
                    className={classes.image}
                    style={{
                      backgroundImage: `url(${item.img})`,
                      marginBottom: '.5rem',
                    }}
                  />
                  <Typography variant="h6" align="center" color="primary">
                    {item.text}
                  </Typography>
                </Link>
              ) : (
                <Link to={`/category/${item.href}`}>
                  <Typography
                    variant="h6"
                    align="center"
                    color="primary"
                    style={{ marginBottom: '.5rem' }}
                  >
                    {item.text}
                  </Typography>
                  <div
                    className={classes.image}
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                </Link>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Collections;
