import { makeStyles } from '@mui/styles';
import { Container, Box, Grid, Typography, Theme } from '@mui/material';
import { IProductPopulated } from '~/types/products';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  title: {
    fontWeight: 'bold',
  },
  centralColumn: {
    [theme.breakpoints.up('md')]: {
      borderWidth: '0 1px 0 1px',
      borderStyle: 'solid',
    },
  },
}));

interface DescriptionProps {
  product: IProductPopulated;
}

const Description: FC<DescriptionProps> = ({ product }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: { xs: 2, sm: 4, md: 6 } }}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Box p={2}>
              <Typography
                variant="h5"
                className={classes.title}
                gutterBottom
                align="center"
              >
                Specification
              </Typography>
              <Typography variant="body1" align="center">
                Brand: {product.brand}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box p={2} className={classes.centralColumn}>
              <Typography
                variant="h5"
                className={classes.title}
                gutterBottom
                align="center"
              >
                Description
              </Typography>
              <Typography variant="body1" align="center">
                {product.description || 'No description'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box p={2}>
              <Typography
                variant="h5"
                className={classes.title}
                gutterBottom
                align="center"
              >
                Material & care
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Description;
