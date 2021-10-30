import { Grid, Container, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FeaturedCard, { IFeature } from './FeaturedCard';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    marginBottom: '1.5rem',
  },
  featured: {
    maxWidth: '90%',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  cardItem: {
    marginTop: '2rem',
    [theme.breakpoints.up('md')]: {
      padding: '2rem 1rem',
      marginTop: 0,
    },
    '&:nth-child(2)': {
      [theme.breakpoints.up('md')]: {
        borderLeft: `1px solid ${theme.palette.primary.light}`,
        borderRight: `1px solid ${theme.palette.primary.light}`,
      },
    },
  },
}));

const Featured = () => {
  const classes = useStyles();
  const features: IFeature[] = [
    { img: '/images/featured/card-1.jpg', text: "Girl's summer 2020" },
    { img: '/images/featured/card-2.jpg', text: "Men's new sportswear" },
    { img: '/images/featured/card-3.jpg', text: "Men's tourism fashion 2020" },
  ];
  return (
    <div className={classes.root}>
      <Container className={classes.featured} maxWidth={false}>
        <Grid container rowGap={2}>
          {features.map((feature) => (
            <Grid
              item
              xs={12}
              md={4}
              className={classes.cardItem}
              key={feature.text}
            >
              <FeaturedCard feature={feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Featured;
