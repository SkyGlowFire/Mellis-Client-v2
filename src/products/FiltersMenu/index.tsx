import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import PriceFilter from './PriceFilter';
import SizeFilter from './SizeFilter';
import ColorFilter from './ColorFilter';
import SalesFilter from './SalesFilter';
import SortbyFilter from './SortbyFilter';

interface FiltersMenuProps {
  total: number;
}

const FiltersMenu: FC<FiltersMenuProps> = ({ total }) => {
  return (
    <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
      <Grid item xs={6} sm={4} md={3} lg={2}>
        <SizeFilter />
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
        <ColorFilter />
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
        <PriceFilter />
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
        <SalesFilter />
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2} container alignItems="center">
        <Typography color="primary" sx={{ fontSize: '.8rem' }}>
          {total} Products
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
        <SortbyFilter />
      </Grid>
    </Grid>
  );
};

export default FiltersMenu;
