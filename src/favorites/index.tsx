import { Grid, Container, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FavItemCard from './FavItemCard';
import { useAppSelector } from '~/app/hooks';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    maxWidth: 1600,
    paddingTop: '2rem',
    minHeight: 400,
  },
  item: {
    height: 500,
    [theme.breakpoints.up('sm')]: {
      height: '75vw',
    },
    [theme.breakpoints.up('md')]: {
      height: 650,
    },
    [theme.breakpoints.up('lg')]: {
      height: 700,
    },
  },
}));

const Favorites = () => {
  const classes = useStyles();
  const { items } = useAppSelector((state) => state.favorites);
  return (
    <Container maxWidth={false} className={classes.root}>
      <Typography variant="h5" style={{ marginBottom: '2rem' }}>
        Favorites
      </Typography>
      {items.length > 0 ? (
        <Grid container spacing={6} style={{ marginBottom: '2rem' }}>
          {items.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={classes.item}
              key={item.id}
            >
              <FavItemCard item={item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" style={{ marginBottom: '2rem' }}>
          No favorite products
        </Typography>
      )}
    </Container>
  );
};

export default Favorites;
